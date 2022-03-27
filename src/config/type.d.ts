declare type Configuration = Readonly<{
  /**
   * 应用名称
   */
  APP_NAME: string
  /**
   * 应用LOGO
   */
  APP_LOGO: string

  /**
   * 应用 TITLE
   */
  APP_TITLE: string

  /**
   * 应用版本
   */
  APP_VERSION: string

  /**
   * 资源服务器地址
   */
  FILE_BASE_URL: string

  /**
   * api base url
   */
  API_BASE_URL: string

  /**
   * upload base url
   */
  UPLOAD_BASE_URL: string
}>;
