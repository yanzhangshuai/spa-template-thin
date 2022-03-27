import type { RouteRecordRaw } from 'vue-router';
import { HomeRouteName } from './const';

const router: RouteRecordRaw = {
  path: '/home',
  name: HomeRouteName.DEFAULT_ROUTER,
  component: () => import('@/page/home/index.vue'),
  meta: {
    auth: true
  }
};

export default router;
