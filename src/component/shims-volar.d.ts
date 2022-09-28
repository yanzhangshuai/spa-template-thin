declare module 'vue' { 
  export interface GlobalComponents { 
    'm-config-provider': typeof import('./modules/config-provider/index')['default']
    'm-http-demo': typeof import('./modules/http-demo/index')['default']
  }
}
export {}