export {};
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $window: Window & typeof globalThis
    $globalProps: GlobalProps
    $config: Configuration
  }
}
