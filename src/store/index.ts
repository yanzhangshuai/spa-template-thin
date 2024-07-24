// import { PiniaStorage } from '@mwjz/pinia-storage';
import { PiniaDebounce } from '@pinia/plugin-debounce'
import { debounce } from 'lodash'
import { createPinia } from 'pinia'
import type { App, Plugin } from 'vue'

import { defineX } from '@/util/module'

export default defineX<Plugin>({
  install(app: App) {
    const store = createPinia()

    store.use(PiniaDebounce(debounce))
    // store.use((PiniaStorage({ prefix: 'spa-template_' })));

    app.use(store)
  },
})
