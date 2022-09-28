import type { Router } from 'vue-router';

import { useAsker } from '@mwjz/asker';

export function createHttpGuard(router: Router): void {
  router.beforeEach(() => {
    const http = useAsker();

    http?.canceler?.removeAllPending();
    return true;
  });
}
