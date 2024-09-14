<script lang="ts" setup>
const props = defineProps<{
  name: string
}>()
</script>

<template>
  <h1>{{ props.name }}</h1>
</template>

<style lang="less"></style>
