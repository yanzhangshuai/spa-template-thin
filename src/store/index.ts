import type { App, Plugin } from 'vue'

import { createPinia } from 'pinia'
import { defineX } from '@/util/module'

export default defineX<Plugin>({
  install(app: App) {
    const store = createPinia()

    app.use(store)
  },
})
