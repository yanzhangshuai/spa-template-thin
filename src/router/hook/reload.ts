import { unref } from 'vue'
import type { Router } from 'vue-router'
import { useRouter } from 'vue-router'

export function useReload(router: Router = useRouter()): PromiseFn<never, boolean> {
  return (): Promise<boolean> => {
    return new Promise((resolve) => {
      router.replace(unref(router.currentRoute)).then(() => resolve(true))
    })
  }
}
