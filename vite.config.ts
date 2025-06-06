import process from 'node:process'
import { defineConfig } from 'vite'

import { devConf } from './build/config'
import setupPlugin from './build/plugins'
import { configProxy } from './build/utils'

export default defineConfig((config) => {
  process.env.VITE_ENV = config.mode as 'development' | 'production' | 'test'

  return {

    base: './',
    css : {
      preprocessorOptions: {
        less: {
          additionalData: `
              @import "/src/styles/theme/def.less";
            `,
        },
      },
    },

    plugins: setupPlugin(),
    build  : {
      chunkSizeWarningLimit: 500,
      rollupOptions        : {
        output: {
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              if (id.includes('ant-design')) {
                return 'a'
              }
              else if (id.includes('vue')) {
                return 'v'
              }

              // 使用正则获取包
              const regex = /node_modules\/\.pnpm\/(.+?)[\d@]/
              const match = id.match(regex)
              if (match) {
                const name = match[1]
                return name.replace('@', '')
              }
            }
          },
        },
      },
    },

    server: {
      host : true,
      port : devConf.port,
      https: devConf.https ? {} : undefined,
      proxy: configProxy(devConf.proxy),
    },
    preview: {
      host : true,
      port : devConf.port,
      https: devConf.https ? {} : undefined,
      proxy: configProxy(devConf.proxy),
    },

    test: {
      globals    : true,
      environment: 'jsdom',
      include    : ['**/*.test.ts'],
      coverage   : {
        all     : true,
        reporter: ['text', 'json', 'html'],
      },
      inspectBrk     : true,
      fileParallelism: false,
      browser        : {
        provider : 'playwright',
        instances: [{ browser: 'chromium' }],
      },
    },

  }
})
