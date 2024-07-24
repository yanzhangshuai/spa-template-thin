import type { Router } from 'vue-router'

import { useAccountStore } from '@/store/account'

export function authGuard(router: Router): void {
  router.beforeEach((to, _, next) => {
    const auth = to?.meta?.auth !== false

    if (!auth) {
      return next()
    }

    useAccountStore().getUserInfo()
      .then(() => next())
      .catch(() => { next('/account/login') })
  })
}
