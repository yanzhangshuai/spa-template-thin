declare namespace NodeJS {
  interface ProcessEnv {
    VITE_ENV   : 'development' | 'production' | 'test'
    VITE_REPORT: 'true' | 'false'
    VITE_GZIP  : 'true' | 'false'
  }
}
