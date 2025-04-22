<script lang="ts" setup>
import { useTest1Service } from '@/service/test1'
import { onMounted, unref, useTemplateRef } from 'vue'
import { defineSTableColumns } from '@/component/s-table/index.vue'

const t1Service = useTest1Service()

const tableRef = useTemplateRef('table')

const cols = defineSTableColumns([
  { key: ' id ',        title: '__ID__' },
  { key: 'name',        title: '姓名' },
  { key: 'age',         title: '年龄' },
  { key: 'createdAt',   title: '创建时间' },
])

const getData = () => {
  return t1Service.list()
}

onMounted(() => {
  unref(tableRef)?.data?.items?.forEach?.((d) => {
    console.log(d.name)
  })
})
</script>

<template>
  <STable
    ref="table"
    auto
    row-key="id"
    opera-width="200"
    :cols="cols"
    :get-data="getData"
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
