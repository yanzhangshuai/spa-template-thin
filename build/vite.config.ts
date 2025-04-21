import process from 'node:process'
import { defineConfig } from 'vite'

import serverFn from './config/server'
import pluginFn from './config/plugins'
import { tsconfigAlias } from './util/tsconfig.alias'

export default defineConfig((config) => {
  process.env.VITE_ENV = config.mode as 'development' | 'production' | 'test'

  return {

    css: {
      preprocessorOptions: {
        less: {
          additionalData: `
              @import "/src/assets/styles/theme/def.less";
            `,
        },
      },
    },

    plugins: pluginFn(),
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
    server : serverFn(),
    preview: serverFn(),
    resolve: {
      alias: tsconfigAlias('tsconfig.app.json'),
    },
  }
})
