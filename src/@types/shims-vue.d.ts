/// <reference types="vue/macros-global" />

declare module '*.vue' {
  import type { DefineComponent, Plugin } from 'vue'

  const component: DefineComponent<{}, {}, unknown>

  export function definePlugin(plugin: Plugin): Plugin {
    return plugin
  }
  export default component
}

declare module 'vue' {
  // import type { Plugin } from 'vue';

  // export function definePlugin(plugin: Plugin): Plugin {
  //   return plugin;
  // }
}
export {}
