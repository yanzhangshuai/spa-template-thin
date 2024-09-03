import process from 'node:process'

import { optimizeLodashImports } from '@optimize-lodash/rollup-plugin'
import basicSsl from '@vitejs/plugin-basic-ssl'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import UnoCSS from 'unocss/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import VueRouter from 'unplugin-vue-router/vite'
import type { Plugin } from 'vite'
import { imagetools } from 'vite-imagetools'
import { compression } from 'vite-plugin-compression2'
import ViteRestart from 'vite-plugin-restart'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import vueDevTools from 'vite-plugin-vue-devtools'
import tsconfigPaths from 'vite-tsconfig-paths'

import { defineX, devConf } from '../config'

export default defineX<Fn<Array<Plugin | Plugin[]>>>(() => {
  const plugins: Array<Plugin | Plugin[]> = [
    ViteRestart({ restart: ['src/assets/styles/theme/*.less'] }),

    UnoCSS(),

    Components({
      dirs     : ['src/component'],
      dts      : './src/component/components.d.ts',
      resolvers: [
        AntDesignVueResolver({ importStyle: 'less' }),
      ],
    }),
    VueRouter({
      extensions  : ['.page.vue'],
      routesFolder: ['src/page'],
      dts         : 'src/router/typed-router.d.ts',
    }),
    vue(),
    vueJsx({ optimize: true, transformOn: true }),

    imagetools(),
    viteStaticCopy({
      targets: [
        { src: 'config.json', dest: '' },
        // { src: 'src/assets/!(style)', dest: './assets' },
      ],

    }),

    // tsconfigPaths(),

    vueDevTools({
      componentInspector: true,
      launchEditor      : 'code',

    }) as Plugin,
  ]

  if (devConf.https) {
    plugins.push(basicSsl({ name: 'dev', domains: ['*.com'] }))
  }

  if (process.env.VITE_ENV === 'production') {
    // 生产环境下启用 lodash 优化
    plugins.push(optimizeLodashImports())
  }

  if (process.env.VITE_GZIP === 'true') {
    plugins.push(compression())
  }

  if (process.env.VITE_REPORT === 'true') {
    plugins.push(visualizer({
      open      : true,
      gzipSize  : true,
      brotliSize: true,
      template  : 'treemap', // "sunburst" | "treemap" | "network",
      filename  : './report/libs/index.html',
    }))
  }

  return plugins
})
