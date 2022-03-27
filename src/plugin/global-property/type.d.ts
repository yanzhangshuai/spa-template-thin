declare type GlobalProps = Readonly<{
  /**
  * 开发环境
  */
  readonly DEV?: boolean

  /**
  * 日期格式化
  */
  readonly dateFormat: (date: number | Date, template?: string) => string
}>;
