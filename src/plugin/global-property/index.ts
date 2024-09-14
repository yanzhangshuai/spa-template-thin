import type { Plugin } from 'vue'

import { defineX } from '@/util/module'
import { dateFormat } from '@/util/date'

let globalProps: DeepReadonly<AppProps>

export default defineX<Plugin>({
  install(app) {
    globalProps = {
      DEV: import.meta.env.DEV,
      dateFormat,
    }

    Object.defineProperty(app.config.globalProperties, '$win', {
      enumerable: false,
      get() {
        return window
      },
    })

    Object.defineProperty(app.config.globalProperties, '$app', {
      enumerable: false,
      get() {
        return globalProps
      },
    })

    // Object.defineProperty(app.config.globalProperties, '$conf', {
  //   enumerable: false,
  //   get() {
  //     return config;
  //   }
  // });
  },
})

export function useGlobalProps() {
  return globalProps
}
