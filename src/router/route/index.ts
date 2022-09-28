import type { RouteRecordRaw } from 'vue-router';

import { flatten } from 'ramda';
import { isArray } from '@mwjz/utils';

import { ErrorRouteName } from '@/router/route/modules/error/const';
import { moduleFilter } from '@/util/helper';

import { HomeRouteName } from './modules/home/const';
import { defineRoute } from './type';

export default defineRoute([
  ...findModuleRoutes(),
  { path: '/', redirect: HomeRouteName.DEFAULT },
  { path: '/:catchAll(.*)', redirect: { name: ErrorRouteName.NOT_FOUND } }
]);

/**
 * 遍历moduleRoutes
 * @returns
 */
function findModuleRoutes(): Array<RouteRecordRaw> {
  const modules = moduleFilter<Array<RouteRecordRaw> | RouteRecordRaw>(import.meta.globEager('./modules/*/index.ts'));

  const routes = Object.keys(modules).map((key) => {
    const module = modules[key] as Array<RouteRecordRaw> | RouteRecordRaw;
    return isArray(module) ? module : [module];
  });
  return flatten(routes);
}
