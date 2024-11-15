import type { RouteRecordRaw } from 'vue-router'

import { defineRoute } from '@/util/define'
import { flatten, isArray } from 'lodash-es'
import { moduleFilter } from '@/util/module'
import { routes as vRoutes } from 'vue-router/auto-routes'

type Route = RouteRecordRaw | RouteRecordRaw[]

export default defineRoute([
  ...vRoutes,
  ...findModuleRoutes(),
  { path: '/', redirect: '/home' },
  { path: '/:catchAll(.*)', redirect: '/error/404' },
])

/**
 * 遍历moduleRoutes
 * @returns routes
 */
function findModuleRoutes(): Array<RouteRecordRaw> {
  const modules = moduleFilter<Route>(import.meta.glob('./**/index.ts', { eager: true }), { de: false })

  const routes = Object
    .keys(modules)
    .map((name) => {
      const route = modules[name].default

      return isArray(route) ? route : [route]
    })

  return flatten(routes)
}
