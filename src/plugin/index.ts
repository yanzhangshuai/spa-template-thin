import { definePlugin } from '@/utils/define'

import GlobalProperty from './global-property'

export default definePlugin({
  install(app) {
    app
      .use(GlobalProperty)
  },
})
