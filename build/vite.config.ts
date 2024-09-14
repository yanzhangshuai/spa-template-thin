import process from 'node:process'
import { defineConfig } from 'vite'

import pluginFn from './config/plugin'
import serverOptions from './config/server'
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
    },
    server       : serverOptions,
    preview      : serverOptions,
    rollupOptions: {
      cache : true,
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules')) {
            // 使用正则获取包
            const regex = /node_modules\/(.+?)\//
            const match = id.match(regex)
            if (match) {
              const name = match[1]
              return name.replace('@', '')
            }
          }
        },
      },
    },

    resolve: {
      alias: tsconfigAlias('tsconfig.app.json'),
    },
  }
})
