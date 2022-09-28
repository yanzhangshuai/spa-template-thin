import type { Router } from 'vue-router';

import { createHttpGuard } from './http';

export function setupRouterGuard(router: Router): void {
  createHttpGuard(router);
}
