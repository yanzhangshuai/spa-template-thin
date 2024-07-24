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
      rollupOptions        : {
        output: {
        },
      },
    },
    server : serverOptions,
    preview: serverOptions,

    resolve: {
      alias: tsconfigAlias('tsconfig.app.json'),
    },
  }
})
