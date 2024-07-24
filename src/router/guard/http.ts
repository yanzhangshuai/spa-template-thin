import type { Router } from 'vue-router'

export function httpGuard(router: Router): void {
  router.beforeEach(() => {
    return true
  })
}
