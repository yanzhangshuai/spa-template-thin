<script lang="ts" setup generic="T extends Record<string, any>">
import type { VNode } from 'vue'
import type { Key } from 'ant-design-vue/es/_util/type'
import type { ColumnProps } from 'ant-design-vue/es/table'
import type { TableRowSelection } from 'ant-design-vue/es/table/interface'
import type { GetComponentProps } from 'ant-design-vue/es/vc-table/interface'

import { isNil } from 'lodash-es'
import { set } from '@vueuse/core'
import { isFalsyExceptZero } from '@/util/is'
import { computed, h, onMounted, reactive, ref, unref, useSlots } from 'vue'

export type STableColumnProps<T extends Record<string, any>> = ColumnProps & {
  key    : Extract<keyof T, string>
  title  : string
  type?  : 'memory' | 'text'
  defVal?: string
}

const {
  dataFunc,
  columns,
  rowKey = 'id',
  auto = false,
  selectable = false,
  customRow,
  rowSelection,
  pageSize = 20,
  operaWidth = 0,
  showPagination = true,
  empty = {
    text : '暂无数据',
    image: 'https://static.kelexuexi.com/image/330/empty-state.png',
  },
} = defineProps<{
  dataFunc       : (page: PaginationReq) => Promise<PaginationRes<T> | T[]>
  columns        : Array<STableColumnProps<T>>
  rowKey?        : Extract<keyof T, string>
  auto?          : boolean
  selectable?    : boolean
  customRow?     : GetComponentProps<any>
  /**
   * rowSelection 会覆盖 selectKeys
   */
  rowSelection?  : TableRowSelection<any>
  pageSize?      : number
  operaWidth?    : string | number
  showPagination?: boolean
  empty?: {
    image?: string
    text? : string
  }
}>()

const emit = defineEmits<{
  changed: [count: number]
}>()

// 定义插槽
defineSlots<{
  [key in keyof T]: (val: { record: T }) => VNode[]
} & {
  //  title,不知道怎么使用泛型
  [key: string]: () => VNode[]

} & {
  __operation__: (val: { record: T }) => VNode[]
  // __footer__   : () => VNode[]
}>()

const selectKeys = defineModel<Key[]>('selectKeys', {
  default: () => [],
})

const slots = useSlots()

// const pageRef = useTemplateRef('pageRef')

const reqConf = reactive({ pageSize: 10, page: 1, loading: false })

const pageSizeOptions = ['10', '20', '50', '100']

const data = ref<PaginationRes<T>>()

//  分页数据
const list = computed(() => unref(data)?.items || [])

//  总页数
const pageCount = computed(() => unref(data)?.pageCount || 0)

//  总数量
const count = computed(() => unref(data)?.count || 0)

//  表头
const _columns = computed<STableColumnProps<T>[]>(() => {
  const cols = columns.map<STableColumnProps<T>>((c) => {
    return {
      ...c,
      dataIndex: c.key?.toString() || '',
      title    : c.title,
    }
  })
  if (operaWidth) {
    cols.push({
      // @ts-expect-error key 为内部字段
      key      : '__operation__',
      title    : '操作',
      dataIndex: '__operation__',
      width    : Number(operaWidth) || 0,
      fixed    : 'right',
    })
  }

  return cols
})

const _scroll = computed(() => {
  // 计算x轴滚动距离
  let x = columns.reduce((acc, cur) => acc + (Number(cur.width) || 0), 0)

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

//  行选择
const _rowSelection = computed<TableRowSelection<any> | undefined>(() => {
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

// watchEffect(() => {
//   if (!reqConf.loading) {
//     nextTick(() => {
//       const textEl = unref(pageRef)?.$el?.querySelector('.ant-pagination-options-quick-jumper input[type="text"]')

//       textEl?.setAttribute('disable-global-enter', '1')
//     })
//   }
// })

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

      const d = await dataFunc(page)

      reqConf.loading = false

      if (Array.isArray(d)) {
        set(data, {
          page     : page.page,
          pageSize : page.pageSize,
          pageCount: 0,
          count    : d.length,
          items    : d,
        })
      }
      else {
        set(data, {
          ...d,
          page     : d?.page || page.page,
          pageSize : d?.pageSize || page.pageSize,
          pageCount: d?.pageCount || 0,
          count    : d?.count,
          items    : d?.items || [],
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

// 获取字段值
const getFiledValue = (record: T, key: Key | undefined): string => {
  const col = columns.find(c => c.key === key)

  if (!col) {
    return ''
  }

  // 支持多级字段
  const f = col.key
    ?.toString()
    ?.split('.')
    ?.reduce((d, k: string) => d?.[k], record as any)

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

const reload = async (resetPage = true) => {
  resetPage && (reqConf.page = 1)
  return lazyGetData()
}

// const deleteItem = (id: unknown) => {
//   if (!data.value?.items)
//     return

//   data.value.items = data.value.items.filter(t => t[rowKey] !== id)

//   if (data.value.count) {
//     data.value.count -= 1
//     emit('countChanged', unref(count))
//   }
// }

// //  修改指定数据的事件,参数为id和一个回调,回调参数为修改前的对象,返回值为修改后的对象
// const updateData = (id: unknown, callback: (data: T) => T) => {
//   if (!listResponse.value?.items)
//     return

//   // @ts-expect-error
//   const index = listResponse.value.items.findIndex(item => item[rowKey] === id)
//   if (index === -1)
//     return
//   listResponse.value.items[index] = callback(listResponse.value.items[index])
//   listResponse.value.items = [...listResponse.value.items]
// }

const onShowSizeChange = (_: number, pageSize: number) => {
  reqConf.pageSize = pageSize
  reqConf.page = 1
  lazyGetData().then()
}

const onChange = (page: number) => {
  reqConf.page = page
  lazyGetData().then()
}

const getTitleVNode = (title: string): VNode[] | VNode => {
  if (!title) {
    return []
  }

  const os = slots[title]

  if (!os) {
    return h('li', { tabindex: '-1' }, title)
  }

  return os()
}

const getValueVNode = (key: Key | undefined, record: T): VNode[] | VNode => {
  if (!key) {
    return []
  }

  const os = slots[key]

  if (!os) {
    const val = getFiledValue(record, key)
    return h('li', { tabindex: '-1', title: val }, val)
  }

  const vn = os({ record })

  vn.forEach((v) => {
    //  antdv-table 具有一个bug，不具有tabindex属性的元素关闭弹窗会滚动到title，所有在此默认节点具有一个-1的tabindex
    if (!v.props) {
      v.props = {}
    }
    if (isNil(v.props.tabindex)) {
      v.props.tabindex = '-1'
    }
  })

  return vn
}

onMounted(async () => {
  if (pageSize) {
    reqConf.pageSize = pageSize
  }

  if (auto) {
    lazyGetData().then()
  }
})

defineExpose({
  list,
  count,
  pageCount,
  data,
  reload,
//   updateData,
//   deleteItem,
})
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
        :columns="_columns"
        :scroll="_scroll"
        :data-source="list"
        :row-key="rowKey"
        :custom-row="customRow"
        :pagination="false"
      >
        <template #headerCell="{ title }">
          <SVnodeRender :nodes="getTitleVNode(title)" />
        </template>

        <template #bodyCell="{ column, record }">
          <SVnodeRender :nodes="getValueVNode(column.key, record as T)" />
        </template>
      </ATable>

      <div class="footer flex-center-between" :class="$slots.__footer__ || showPagination ? 'pt-4' : ''">
        <!-- <div class="l">
          <slot name="__footer__" />
        </div> -->

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

<style lang="less" scoped>
:deep(tr.ant-table-row-selected) {
    td {
        background-color: white;
    }
}

.s-table  {
    .ant-pagination-item-link {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    //F
    .table {
        .ant-table-body {
            .ant-table-thead {
                height: 40px;
            }
        }

        .ant-table-placeholder {
            display: none;
        }
    }

    .empty {
        display: flex;
        flex-direction: column;
        margin: 64px;
        align-items: center;
        justify-content: center;

        //position: absolute;
        //top: 0;
        //left: 0;
        //width: 100%;
        //height: 100%;
        //display: flex;
        //align-items: center;
        //justify-content: center;
        img {
            height: 100px;
        }

        span {
            font-size: 12px;
            // color: @secondary;
        }
    }

    .loading {
        height: 240px;
    }
}

li {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
