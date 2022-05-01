import { createVNode } from 'vue';
import { RouterView } from 'vue-router';
import { defineRoute } from '../../type';
import { AccountRouteName } from './const';

export default defineRoute({
  path: '/account',
  name: AccountRouteName.DEFAULT_ROUTER,
  component: () => Promise.resolve(createVNode(RouterView)),
  children: [
    {
      path: '',
      redirect: { name: AccountRouteName.LOGIN_ROUTER }
    },
    {
      path: 'login',
      name: AccountRouteName.LOGIN_ROUTER,
      component: () => import('@/page/account/login/index.vue')
    }
  ]
});
