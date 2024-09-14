import type { Plugin } from 'vue'

import { defineX } from '@/util/module'
import { VueQueryPlugin } from '@tanstack/vue-query'

import GlobalProperty from './global-property'

export default defineX<Plugin>({
  install(app) {
    app
      .use(VueQueryPlugin)
      .use(GlobalProperty)
  },
})
