<script lang="ts" setup>
import { useDemoService } from '@/service/demo'
import { onMounted, unref, useTemplateRef } from 'vue'
import { defineSTableColumns } from '@/components/s-table/index.vue'

const t1Service = useDemoService()

const tableRef = useTemplateRef('table')

const cols = defineSTableColumns([
  { key: ' id ',        title: '__ID__' },
  { key: 'name',        title: '姓名' },
  { key: 'age',         title: '年龄' },
  { key: 'createdAt',   title: '创建时间' },
])

const getData = (pageReq: PaginationReq) => {
  return t1Service.list(pageReq)
}

onMounted(() => {
  unref(tableRef)?.items?.forEach?.((d) => {
    console.log(d.name)
  })
})

const onClick = () => {
  unref(tableRef)?.reload()
}
</script>

<template>
  <button @click="onClick">重新加载</button>

  <STable
    ref="table"
    auto
    row-key="id"
    opera-width="200"
    :cols="cols"
    :query-fn="getData"
  >
    <template #createdAt="{ record }">
      {{ $app.dateFormat(record.createdAt) }}
    </template>

    <template #__operation__="{ record }">
      <AButton type="link" @click="$win.alert(record.id)">删除</AButton>
    </template>

    <template #__ID__>
      工号
    </template>
  </STable>
</template>

<style lang="less" scoped>
h2 {
  background: @primary;
}
</style>
