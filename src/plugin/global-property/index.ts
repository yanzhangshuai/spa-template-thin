import { dateFormat } from '@/util/date'
import { definePlugin } from '@/util/define'

let globalProps: DeepReadonly<AppProps>

export default definePlugin({
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
