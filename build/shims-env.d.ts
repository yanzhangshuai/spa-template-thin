declare namespace NodeJS {
  interface ProcessEnv {
    VITE_ENV   : 'development' | 'production' | 'test'
    VITE_REPORT: 'true' | 'false'
    VITE_GZIP  : 'true' | 'false'
  }
}

declare type Fn<T = any, R = T> = (...args: any[]) => R

declare type Recordable<T = any> = Record<string, T>
