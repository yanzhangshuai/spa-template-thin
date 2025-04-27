<script lang="ts" setup>
// import dayjs from 'dayjs'
// import 'dayjs/locale/zh-cn'
// import { ref, watch } from 'vue'
// import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

// dayjs.locale('en')

// const locale = ref(enUS.locale)

// watch(locale, (val) => {
//   dayjs.locale(val)
// })
</script>

<template>
  <div class="config-provider">
    <AConfigProvider :locale="zhCN">
      <slot />
    </AConfigProvider>
  </div>
</template>

<style lang="less"></style>
