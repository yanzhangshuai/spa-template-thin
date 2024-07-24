<script lang="ts" setup>
import Item from './item.vue'
</script>

<template lang="pug">
h1(class="text-2xl text-r flex-center") h1

a-button(type="primary" @click="() => $router.push('/account/login')") 登录

img(src="@/assets/images/logo.png?format=webp" alt="logo" class="w-20 h-20")
Item(name="Hello World")

RouterView
</template>

<style lang="less" scoped>
h1 {
  background-image: url('@/assets/images/logo.png');

  //background: @primary;
}
</style>
