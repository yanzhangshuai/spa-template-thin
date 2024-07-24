import type { PreviewOptions, ProxyOptions, ServerOptions } from 'vite'

import { defineX, devConf } from '../config'

export default defineX<ServerOptions | PreviewOptions>({
  host : true,
  port : devConf.port,
  https: devConf.https ? {} : undefined,
  proxy: createProxy(devConf.proxy),
})

function createProxy(proxy: Recordable<string>): Recordable<ProxyOptions> {
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