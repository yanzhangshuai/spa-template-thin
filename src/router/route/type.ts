import type { RouteRecordRaw } from 'vue-router'

export type Route = RouteRecordRaw | Array<RouteRecordRaw>

export function defineRoute(route: Route) {
  return route
}
