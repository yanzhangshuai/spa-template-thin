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

const pageSizeOptions = [10, 20, 50, 100]

const DEF_PAGE_SIZE = pageSizeOptions[0]
</script>

<script lang="ts"></script>

<!--
E = Entity  数据类型
K = Key     col列的key
T = Title   col列的title
-->
<script lang="ts" setup
  generic="E extends Record<string, any>, K extends Record<string, any>, T extends Record<string, any>"
>
  import type { VNode } from 'vue'
  import type { Key } from 'ant-design-vue/es/_util/type'
  import type { ColumnProps } from 'ant-design-vue/es/table'
  import type { TablePaginationConfig, TableRowSelection } from 'ant-design-vue/es/table/interface'
  import type { GetComponentProps } from 'ant-design-vue/es/vc-table/interface'

  import { isNil } from 'lodash-es'
  import { set } from '@vueuse/core'
  import { isFalsyExceptZero } from '@/utils/is'
  import { computed, h, reactive, ref, unref, useSlots } from 'vue'
  import { useRequest } from 'vue-request'

  const {
    queryFn,
    cols,
    rowKey          = 'id',
    auto            = false,
    selectable      = false,
    pageSize        = DEF_PAGE_SIZE,
    operaWidth      = 0,
    showPagination  = true,
    customRow,
    rowSelection,
  } = defineProps<{
    queryFn:          ((pageReq: PaginationReq) => Promise<PaginationRes<E>>) | (() => Promise<E[]>)
    cols:             Array<STableColumn<K, T>>
    rowKey?:          Extract<keyof E, string>
    auto?:            boolean
    selectable?:      boolean
    pageSize?:        number
    operaWidth?:      string | number
    showPagination?:  boolean
    customRow?:       GetComponentProps<any>
    /**
     * rowSelection 会覆盖 selectKeys
     */
    rowSelection?:    TableRowSelection<any>
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

  const pageReq = reactive({ pageSize: pageSize, page: 1 })

  // TODO： 使用 never 类型
  const { data, loading, runAsync } = useRequest<PaginationRes<E> | E[], [PaginationReq] | [never]>(queryFn, {
    manual:           true,
    debounceInterval: 200,
  })

  const slots = useSlots()

  const pageRes = ref<PaginationRes<E>>()
  //  分页数据
  const items   = computed(() => unref(pageRes)?.items || [])
  //  总数量
  const count   = computed(() => unref(pageRes)?.count || 0)

  //  表头
  const _cols = computed(() => {
    const _cols = cols.map<STableColumn<K, T>>((c) => {

      return {
        ...c,
        dataIndex:  c.key?.toString() || '',
        title:      c.title,
      }

    })

    if (operaWidth) {
      _cols.push({
        // @ts-expect-error key 为内部字段
        key: '__operation__',
        // @ts-expect-error key 为内部字段
        title: '操作',
        dataIndex: '__operation__',
        width: Number(operaWidth) || 0,
        fixed: 'right',
      })
    }

    return _cols
  })

  const _scroll = computed(() => {
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

    if (!pageRes.value?.count) {
      return false
    }

    //  总数量小于等于  每页最小数量时(10)不显示分页
    return pageRes.value.count > Number(pageSizeOptions[0])
  })

  const _rowSelection = computed<TableRowSelection<any> | undefined>(() => {
    //  不可选择
    if (!selectable) {
      return undefined
    }

    //  传入了rowSelection则使用传入的
    if (rowSelection) {
      return rowSelection
    }

    return {
      selectedRowKeys: unref(selectKeys),
      onChange: (keys) => {
        selectKeys.value = keys
      },
    }
  })

  const pagination = computed(() => {
    if (!unref(_showPagination))
      return false

    return {
      total:            unref(count),
      current:          pageReq.page,
      pageSize:         pageReq.pageSize,
      pageSizeOptions:  pageSizeOptions,
      showQuickJumper:  true,
      showLessItems:    true,
      showSizeChanger:  true,

      showTotal:        (total: number) => `共${total}条`,
    }
  })

  const run = async () => {
    const params = showPagination ? { page: pageReq.page, pageSize: pageReq.pageSize } : undefined as never
    await runAsync(params)

    const r = unref(data)

    if (!r) {
      return
    }
    if (Array.isArray(r)) {
      set(pageRes, {
        page:     pageReq.page,
        pageSize: pageReq.pageSize,
        count:    r.length,
        items:    r || [],
      })
    }
    else {
      set(pageRes, {
        ...r,
        page:       r?.page || pageReq.page,
        pageSize:   r?.pageSize || pageReq.pageSize,
        items:      r?.items || [],
      })
    }

    emit('changed', unref(count) || 0)
  }

  const reload = (resetPage = true) => {
    if (resetPage) {
      pageReq.page = 1
    }
    run().then()
  }

  const onChange = (pagination: TablePaginationConfig) => {

    pageReq.page      = pagination.current || 1
    pageReq.pageSize  = pagination.pageSize || 20
    run().then()
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

  const getVal = (key: Key | undefined, record: E) => {
    if (!key) {
      return []
    }

    const slot = slots[key]

    // 不存在插槽则直接返回值
    if (!slot) {
      const val = getFiledValue(record, key)

      return h('li', { tabindex: '-1', title: val }, val)
    }

    const vNode = slot({ record })
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
    items,
    count,
    pageRes,
    reload,
  })

  if (auto) {
    run()
  }
</script>

<template>
  <div class="s-table">
    <ATable
      :row-selection="_rowSelection"
      :loading="loading"
      :columns="_cols"
      :scroll="_scroll"
      :data-source="items"
      :row-key="rowKey"
      :custom-row="customRow"
      :pagination="pagination"
      @change="onChange"
    >
      <template #headerCell="{ title }">
        <SVNode :nodes="getTitleVNode(title)" />
      </template>

      <template #bodyCell="{ column, record }">
        <SVNode :nodes="getVal(column.key, record as E)" />
      </template>
    </ATable>
  </div>
</template>
