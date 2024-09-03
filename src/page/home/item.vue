<script lang="ts" setup>
const props = defineProps<{
  name: string
}>()
</script>

<template lang="pug">
h1 {{ props.name }}
</template>

<style lang="less"></style>
