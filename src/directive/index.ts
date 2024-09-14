import type { App, Directive, Plugin } from 'vue'

import { isNil } from 'lodash'
import { defineX, moduleFilter } from '@/util/module'

export default defineX<Plugin>({
  install(app) {
    setup(app)
  },
})

function setup(app: App) {
  const modules = moduleFilter<Directive>(import.meta.glob('./modules/**/*.{ts,js}', { eager: true }), { de: false })

  //  匹配文件名称的正则
  Object.keys(modules).forEach((m) => {
    const directive = modules[m].default

    let name = ''

    if (directive.name) {
      name = directive.name
    }
    else {
      const regex = /\/([^/]+)\.ts$/
      const fileMatch = m.match(regex)
      name = isNil(fileMatch?.[1]) ? '' : fileMatch?.[1]
    }

    if (!name || name === 'index') {
      return
    }

    app.directive(name, directive)
  })
}
