import type { UserConfig } from 'vitest/config'

import { defineConfig } from 'vite'

import viteConfig from '../build/vite.config'

export default defineConfig(async (env) => {
  let config = typeof viteConfig === 'function' ? viteConfig(env) : viteConfig

  if (typeof config === 'object' && typeof (config as Promise<UserConfig>).then === 'function') {
    // Promise
    config = await config
  }

  const userConfig: UserConfig = {
    ...config,
    test: {
      globals    : true,
      environment: 'jsdom',
      dir        : 'test',
      include    : ['**/*.{test,spec}.ts'],
      coverage   : {
        reporter        : ['html'],
        all             : true,
        reportsDirectory: 'report/test',
      },
    },
  }

  return userConfig
})
