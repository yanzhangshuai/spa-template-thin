import { flatten } from 'ramda';
import type { RouteRecordRaw } from 'vue-router';
import { HomeRouteName } from './modules/home/const';
import { isArray } from '@/util/is';
import { moduleFilter } from '@/util/helper';

/**
 * 遍历moduleRoutes
 * @returns
 */
const findModuleRoutes = (): Array<RouteRecordRaw> => {
  const modules = moduleFilter<Array<RouteRecordRaw> | RouteRecordRaw>(import.meta.globEager('./modules/*/index.ts'));

  return flatten(
    Object.keys(modules).map((key) => {
      const module: Array<RouteRecordRaw> | RouteRecordRaw = modules[key] as Array<RouteRecordRaw> | RouteRecordRaw;
      return isArray(module) ? module : [module];
    })
  );
};

const moduleRoutes = findModuleRoutes();

const routes: Array<RouteRecordRaw> = [
  ...moduleRoutes,
  {
    path: '/',
    redirect: HomeRouteName.DEFAULT_ROUTER
  }
];

export default routes;
