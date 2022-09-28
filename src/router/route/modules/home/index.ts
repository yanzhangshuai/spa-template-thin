import { defineRoute } from '../../type';

import { HomeRouteName } from './const';

export default defineRoute({
  path: '/home',
  name: HomeRouteName.DEFAULT,
  component: () => import('@/page/home/index.vue'),
  meta: {
    auth: true
  }
});
