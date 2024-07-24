export {}
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $win: Window & typeof globalThis
    $app: AppProps
    // $conf: any
  }
}
