interface ImportMetaEnv extends Readonly<Record<string, string | boolean | undefined>> {

  /**
  * 应用版本
  */
  readonly GLOBAL_APP_VERSION: string

}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
