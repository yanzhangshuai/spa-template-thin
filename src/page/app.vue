<script lang="ts" setup>
import { usePageTitle } from '@/hook/web/title';
import { useUserStore } from '@/store/modules/user';

usePageTitle();
const userStore = useUserStore();

userStore.getUserInfo().then((res) => {
  console.log('res', res);
});
</script>

<template>
  <config-provider>
    <router-view />
  </config-provider>
</template>
