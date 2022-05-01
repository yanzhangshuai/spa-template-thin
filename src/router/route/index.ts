import { flatten } from 'ramda';
import type { RouteRecordRaw } from 'vue-router';
import { HomeRouteName } from './modules/home/const';
import { defineRoute } from './type';
import { isArray } from '@/util/is';
import { moduleFilter } from '@/util/helper';

const route = defineRoute([
  ...findModuleRoutes(),
  {
    path: '/',
    redirect: HomeRouteName.DEFAULT_ROUTER
  }
]);

export default route;

/**
 * 遍历moduleRoutes
 * @returns
 */
function findModuleRoutes(): Array<RouteRecordRaw> {
  const modules = moduleFilter<Array<RouteRecordRaw> | RouteRecordRaw>(import.meta.globEager('./modules/*/index.ts'));

  return flatten(
    Object.keys(modules).map((key) => {
      const module: Array<RouteRecordRaw> | RouteRecordRaw = modules[key] as Array<RouteRecordRaw> | RouteRecordRaw;
      return isArray(module) ? module : [module];
    })
  );
}
