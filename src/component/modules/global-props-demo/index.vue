<script setup lang="ts"></script>

<template>
  <li>应用名称：{{ $config.APP_NAME }}</li>
  <li>应用logo：<img :src="$config.APP_LOGO" alt="" width="50"></li>
  <li>应用版本：{{ $config.APP_VERSION }}</li>
  <li>应用标题：{{ $config.APP_TITLE }}</li>
  <li>文件服务器地址：{{ $config.FILE_BASE_URL }}</li>
  <li>当前是否为开发环境：{{ $globalProps.DEV }}</li>
  <li>当前时间：{{ $globalProps.dateFormat($window.Date.now()) }}</li>
</template>

<style lang="less" scoped>
li {
  @apply font-bold py-1 list-none px-0 text-red-300 rounded !important;
}
</style>
