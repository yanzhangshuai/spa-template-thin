<script lang="ts" setup>
definePage({
  meta: {
    title: '登录',
    auth : false,
  },
})
</script>

<template lang="pug">
h1 This is Login
a-button(type="primary" @click="() => $router.push('/account/reg')") 注册
</template>
