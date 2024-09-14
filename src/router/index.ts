import type { App, Plugin } from 'vue'

import { defineX } from '@/util/module'
import { createRouter, createWebHistory } from 'vue-router'

import routes from './route'
import { setupRouterGuard } from './guard'

export default defineX<Plugin>({
  install(app, readyCallBack: (app: App) => void) {
    const router = setup()

    if (!router)
      return

    app.use(router)

    router.isReady()
      .then(() => readyCallBack(app))
      .catch((err) => {
        if (!app.config.errorHandler) {
          console.error(err)
        }
      })
  },
})

function setup() {
  console.log('routes', routes)

  const r = createRouter({
    history       : createWebHistory(),
    routes,
    strict        : false,
    scrollBehavior: () => ({ left: 0, top: 0 }),
  })

  setupRouterGuard(r)

  return r
}
