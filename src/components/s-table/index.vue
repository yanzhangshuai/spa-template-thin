<script lang="ts">
type STableColumn<K extends Record<string, any>, T extends Record<string, any>> = ColumnProps & {
  key    : Extract<keyof K, string>
  title  : Extract<keyof T, string>
  type?  : 'memory' | 'text'
  defVal?: string
}
export function defineSTableColumns<K extends Record<string, any>, T extends Record<string, any>>(cols: STableColumn<K, T>[]) {
  return cols
}

const pageSizeOptions = ['10', '20', '50', '100']
</script>

<script lang="ts"></script>

<!--
E = Entity  数据类型
K = Key     col列的key
T = Title   col列的title
-->
<script lang="ts" setup generic="E extends Record<string, any>, K extends Record<string, any>, T extends Record<string, any>">
import type { VNode } from 'vue'
import type { Key } from 'ant-design-vue/es/_util/type'
import type { ColumnProps } from 'ant-design-vue/es/table'
import type { TableRowSelection } from 'ant-design-vue/es/table/interface'
import type { GetComponentProps } from 'ant-design-vue/es/vc-table/interface'

import { isNil } from 'lodash-es'
import { set } from '@vueuse/core'
import { isFalsyExceptZero } from '@/utils/is'
import { computed, h, reactive, ref, unref, useSlots } from 'vue'

const {
  getData,
  cols,
  rowKey          = 'id',
  auto            = false,
  selectable      = false,
  pageSize        = 20,
  operaWidth      = 0,
  showPagination  = true,
  empty           = { text: '暂无数据', image: 'https://static.kelexuexi.com/image/330/empty-state.png' },
  customRow,
  rowSelection,
} = defineProps<{
  getData        : (page: PaginationReq) => Promise<PaginationRes<E> | E[]>
  cols           : Array<STableColumn<K, T>>
  rowKey?        : Extract<keyof E, string>
  auto?          : boolean
  selectable?    : boolean
  pageSize?      : number
  operaWidth?    : string | number
  showPagination?: boolean
  empty?         : { image?: string, text?: string }
  customRow?     : GetComponentProps<any>
  /**
   * rowSelection 会覆盖 selectKeys
   */
  rowSelection?  : TableRowSelection<any>
}>()

const emit = defineEmits<{
  changed: [count: number]
}>()

// col插槽
defineSlots<{
  [key in keyof K]: (val: { record: E }) => VNode[]
} & {
  // title插槽
  [key in keyof T]: () => VNode[]

} & {
  // 操作插槽
  __operation__: (val: { record: E }) => VNode[]
}>()

// 定义selectKeys
const selectKeys = defineModel<Key[]>('selectKeys', {
  default: () => [],
})

const slots     = useSlots()

const reqConf   = reactive({ pageSize: pageSize || 10, page: 1, loading: false })

const data      = ref<PaginationRes<E>>()
//  分页数据
const list      = computed(() => unref(data)?.items || [])
//  总页数
const pageCount = computed(() => unref(data)?.pageCount || 0)
//  总数量
const count     = computed(() => unref(data)?.count || 0)

//  表头
const _cols  = computed(() => {
  const _cols = cols.map<STableColumn<K, T>>((c) => {

    return {
      ...c,
      dataIndex: c.key?.toString() || '',
      title    : c.title,
    }

  })

  if (operaWidth) {
    _cols.push({
      // @ts-expect-error key 为内部字段
      key      : '__operation__',
      // @ts-expect-error key 为内部字段
      title    : '操作',
      dataIndex: '__operation__',
      width    : Number(operaWidth) || 0,
      fixed    : 'right',
    })
  }

  return _cols
})

const _scroll   = computed(() => {
  // 计算x轴滚动距离
  let x = cols.reduce((acc, cur) => acc + (Number(cur.width) || 0), 0)

  if (operaWidth) {
    x += Number(operaWidth) || 0
  }

  return { x }
})

const _showPagination = computed(() => {
  if (!showPagination) {
    return false
  }

  if (!data.value?.count) {
    return false
  }

  //  总数量小于等于  每页最小数量时(10)不显示分页
  return data.value.count > Number(pageSizeOptions[0])
})

const _rowSelection   = computed<TableRowSelection<any> | undefined>(() => {
  //  不可选择
  if (!selectable) {
    return undefined
  }

  //  传入了rowSelection则使用传入的
  if (rowSelection) {
    return rowSelection
  }

  return  {
    selectedRowKeys: unref(selectKeys),
    onChange       : (keys) => {
      selectKeys.value = keys
    },
  }
})

//  获取数据，
// options.onInvalidate 为清除副作用的函数，
// options.lazy=true 并不会立即立即获取数据，会返回获取函数的函数
let cleanup: (() => void) | undefined
const getDataFn = async (options?: { onInvalidate?: () => void, lazy?: boolean }) => {
  // 清除上一次的副作用
  if (cleanup) {
    cleanup()
  }

  // 保存副作用
  cleanup = options?.onInvalidate

  const handler = async () => {
    try {
      reqConf.loading = true

      const page = {
        page    : reqConf.page,
        pageSize: reqConf.pageSize,
      }

      const res = await getData(page)

      reqConf.loading = false

      if (Array.isArray(res)) {
        set(data, {
          page     : page.page,
          pageSize : page.pageSize,
          pageCount: 0,
          count    : res.length,
          items    : res,
        })
      }
      else {
        set(data, {
          ...res,
          page     : res?.page || page.page,
          pageSize : res?.pageSize || page.pageSize,
          pageCount: res?.pageCount || 0,
          count    : res?.count,
          items    : res?.items || [],
        })
      }

      emit('changed', unref(count))
    }
    catch (err) {
      console.error(err)
    }
  }

  if (options?.lazy) {
    return handler
  }
  else {
    handler()
  }
}

// 带有过期调度器的获取数据
const lazyGetData = async () => {
  let expired = false

  const handle = await getDataFn({
    lazy        : true,
    onInvalidate: () => { expired = true },
  })

  if (!expired) {
    handle?.()
  }
}

const reload = async (resetPage = true) => {
  if (resetPage) {
    reqConf.page = 1
  }
  return lazyGetData()
}

const onShowSizeChange = (_: number, pageSize: number) => {
  reqConf.pageSize  = pageSize
  reqConf.page      = 1

  lazyGetData().then()
}

const onChange = (page: number) => {
  reqConf.page = page
  lazyGetData().then()
}

const getTitleVNode = (title: string) => {
  if (!title) {
    return []
  }

  const os = slots[title]

  // 不存在插槽则直接返回title
  if (!os) {
    return h('li', { tabindex: '-1' }, title)
  }

  return os()
}

// 获取字段值
const getFiledValue = (record: E, key: Key | undefined): string => {
  const col = cols.find(c => c.key === key)

  if (!col) {
    return ''
  }

  // 支持多级字段
  const f = col.key
    ?.toString()
    ?.split('.')
    ?.reduce((d, k: string) => d?.[k.trim()], record as any)

  let val = f

  // memory 类型
  if (col.type === 'memory') {
    // val = formatMoney(f)
    val = ''
  }

  // 存在值则返回
  if (!isFalsyExceptZero(val)) {
    return val
  }

  // 不存在值则返回默认值
  return col.defVal || ''
}

const getValVNode = (key: Key | undefined, record: E) => {
  if (!key) {
    return []
  }

  const os = slots[key]

  // 不存在插槽则直接返回值
  if (!os) {
    const val = getFiledValue(record, key)

    return h('li', { tabindex: '-1', title: val }, val)
  }

  const vNode = os({ record })
  vNode.forEach((v) => {
    //  TODO:??? antdv-table 具有一个bug，不具有tabindex属性的元素关闭弹窗会滚动到title，所有在此默认节点具有一个-1的tabindex
    if (!v.props) {
      v.props = {}
    }

    if (isNil(v.props.tabindex)) {
      v.props.tabindex = '-1'
    }
  })

  return vNode
}

defineExpose({
  list,
  count,
  pageCount,
  data,
  reload,
})

if (auto) {
    lazyGetData().then()
}
</script>

<template>
  <div class="s-table relative">
    <!-- 加载中 -->
    <div v-if="reqConf.loading" class="loading flex-center">
      <ASpin />
    </div>

    <!-- 空数据 -->
    <div v-else-if="!list.length" class="empty flex-x-center">
      <img :src="empty.image || 'https://static.kelexuexi.com/image/330/empty-state.png'" height="100" alt="">
      <span class="mt-3 text-base text-gray">{{ empty.text || '暂无数据' }}</span>
    </div>

    <!-- 数据 -->
    <template v-else-if="list.length">
      <ATable
        :row-selection="_rowSelection"
        :columns="_cols"
        :scroll="_scroll"
        :data-source="list"
        :row-key="rowKey"
        :custom-row="customRow"
        :pagination="false"
      >
        <template #headerCell="{ title }">
          <SVNode :nodes="getTitleVNode(title)" />
        </template>

        <template #bodyCell="{ column, record }">
          <SVNode :nodes="getValVNode(column.key, record as E)" />
        </template>
      </ATable>

      <div class="footer flex-center-between" :class="$slots.__footer__ || showPagination ? 'pt-4' : ''">
        <div v-if="_showPagination" class="pagination flex">
          <!-- ref="pageRef" -->
          <APagination
            v-model:current="reqConf.page"
            v-model:page-size="reqConf.pageSize"
            show-quick-jumper
            show-size-changer
            :page-size-options="pageSizeOptions"
            :total="count"
            @change="onChange"
            @show-size-change="onShowSizeChange"
          />
        </div>
      </div>
    </template>
  </div>
</template>
