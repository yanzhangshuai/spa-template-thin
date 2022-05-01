import { defineRoute } from '../../type';
import { HomeRouteName } from './const';

export default defineRoute({
  path: '/home',
  name: HomeRouteName.DEFAULT_ROUTER,
  component: () => import('@/page/home/index.vue'),
  meta: {
    auth: true
  }
});
