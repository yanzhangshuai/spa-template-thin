declare module 'vue' { 
  export interface GlobalComponents { 
    'config-provider': typeof import('./modules/config-provider/index')['default']
    'http-demo': typeof import('./modules/http-demo/index')['default']
  }
}
export {}