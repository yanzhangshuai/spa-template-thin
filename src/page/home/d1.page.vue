<script lang="ts" setup>
import { ref, unref } from 'vue'

import Item from './component/d1/item.vue'

const itemRef = ref<InstanceType<typeof Item>>()

unref(itemRef)?.fn()
</script>

<template>
  <h2 class="text-2xl text-r flex-center">This is D1</h2>
  <Item />
</template>

<style lang="less" scoped>
h2 {
  background: @primary;
}
</style>
