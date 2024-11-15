<script lang="ts" setup>
import { usePageTitle } from '@/hook/web/title'

usePageTitle()
</script>

<template>
  <SConfigProvider>
    <RouterView />
  </SConfigProvider>
</template>
