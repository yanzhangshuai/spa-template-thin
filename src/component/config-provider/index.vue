<script lang="ts" setup>
import 'dayjs/locale/zh-cn'

import enUS from 'ant-design-vue/es/locale/en_US'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import { ref, watch } from 'vue'

dayjs.locale('en')

const locale = ref(enUS.locale)

watch(locale, (val) => {
  dayjs.locale(val)
})
</script>

<template lang="pug">
.config-provider
  a-config-provider(:locale="locale === 'en' ? enUS : zhCN")
    slot
</template>

<style lang="less"></style>
