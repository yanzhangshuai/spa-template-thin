/// <reference types="vue/macros-global" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component

}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $router: import('vue-router').Router
    $route : import('vue-router').RouteLocationNormalized
  }
}

export { }
