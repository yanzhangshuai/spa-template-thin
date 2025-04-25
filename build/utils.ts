import type { ProxyOptions } from 'vite'

export function configProxy(proxy: Recordable<string>): Recordable<ProxyOptions> {
  const res: Recordable<ProxyOptions> = {}

  Object.keys(proxy)
    .forEach((prefix) => {
      const option: ProxyOptions = {
        target      : proxy[prefix],
        changeOrigin: true,
        ws          : true,
        rewrite     : path => path.replace(new RegExp(`^${prefix}`), ''),
      }

      const isHttps = /^https:\/\//.test(proxy[prefix])

      if (isHttps) {
        // https is require secure=false
        option.secure = false
      }

      res[prefix] = option
    })

  return res
}
