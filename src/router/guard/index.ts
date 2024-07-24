import type { Router } from 'vue-router'

import { authGuard } from './auth'
import { httpGuard } from './http'

export function setupRouterGuard(router: Router): void {
  httpGuard(router)
  authGuard(router)
}
