import { definePlugin } from '@/utils/define'
import { VueQueryPlugin } from '@tanstack/vue-query'

import GlobalProperty from './global-property'

export default definePlugin({
  install(app) {
    app
      .use(VueQueryPlugin)
      .use(GlobalProperty)
  },
})
