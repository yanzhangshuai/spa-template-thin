import type { PluginOption } from 'vite'

import fs from 'node:fs'
import UnoCSS from 'unocss/vite'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import { kebabCase } from 'lodash-es'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { imagetools } from 'vite-imagetools'
import ViteRestart from 'vite-plugin-restart'
import basicSsl from '@vitejs/plugin-basic-ssl'
import VueRouter from 'unplugin-vue-router/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer'
import Components from 'unplugin-vue-components/vite'
import { compression } from 'vite-plugin-compression2'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import { devConf } from '../config'

export default () => {
  const plugins: Array<PluginOption | PluginOption[]> = [
    ViteRestart({ restart: ['src/assets/styles/theme/*.less'] }),

    UnoCSS(),

    Components({
      dirs                : ['src/component', 'src/directive'],
      dts                 : './src/component/components.d.ts',
      directoryAsNamespace: true,
      globalNamespaces     : ['global'],
      resolvers           : [
        AntDesignVueResolver({ importStyle: 'less' }),
        {
          type   : 'directive',
          resolve:  (name) => {
            const filename = `${kebabCase(name)}.ts`

            const exist = fs.existsSync(`src/directive/${filename}`)

            return exist ? `@/directive/${filename}` : null
          },
        },
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

    }),
  ]

  if (devConf.https) {
    plugins.push(basicSsl({ name: 'dev', domains: ['*.com'] }))
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
}
