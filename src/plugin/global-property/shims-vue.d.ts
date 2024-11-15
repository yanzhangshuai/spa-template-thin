export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $win: Window & typeof globalThis
    $app: AppProps
    // $conf: any
  }
}
