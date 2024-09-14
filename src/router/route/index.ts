import type { RouteRecordRaw } from 'vue-router'

import { flatten, isArray } from 'lodash'
import { defineX, moduleFilter } from '@/util/module'
import { routes as vRoutes } from 'vue-router/auto-routes'

import type { Route } from './type'

export default defineX<RouteRecordRaw[]>([
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
