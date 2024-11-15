<script lang="ts" setup>
definePage({
  meta: {
    title: '登录',
    auth : false,
  },
})
</script>

<template>
  <h1>This is Login</h1>

  <AButton type="primary" @click="() => $router.push('/account/reg')">注册</AButton>
</template>
