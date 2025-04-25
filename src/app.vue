<script lang="ts" setup>
import { usePageTitle } from '@/hooks/web/title'

usePageTitle()
</script>

<template>
  <SConfigProvider>
    <RouterView />
  </SConfigProvider>
</template>
