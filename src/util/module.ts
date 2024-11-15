/**
 * moduleFilter 过滤
 * @param modules
 * @param options de 是否只需要默认导出
 * @returns 模块  key:文件名称, value:default:模块 或当前文件所有模块列表
 */
export function moduleFilter<T = unknown>(modules: Recordable<Recordable<T>>, options?: Partial<{ filter: RegExp, de: boolean }>): Recordable<Recordable<T>> {
  // options默认值
  options = Object.assign({ filter: /^.*/, de: true }, options)

  const res: Recordable<Recordable<T>> = {}

  Object.keys(modules)
    .forEach((name) => {
      const module = modules[name]

      // @ts-expect-error 无法判断类型
      if (!options.filter.test(name) || module?.[Symbol.toStringTag] !== 'Module') {
        return
      }

      const keys = Object.keys(module)
        .filter((key) => {
          if (!module[key]) {
            return false
          }

          if (options.de && key !== 'default') {
            return false
          }

          return true
        })

      keys.forEach((key) => {
        res[name] = Object.assign(res[name] || {}, { [key]: module[key] })
      })
    })

  return res
}
