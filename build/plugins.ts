import type { PluginOption } from 'vite'

import fs from 'node:fs'
import UnoCSS from 'unocss/vite'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
import { kebabCase } from 'lodash-es'
import Inspect from 'vite-plugin-inspect'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { imagetools } from 'vite-imagetools'
import ViteRestart from 'vite-plugin-restart'
import basicSsl from '@vitejs/plugin-basic-ssl'
import tsconfigPaths from 'vite-tsconfig-paths'
import { viteMockServe } from 'vite-plugin-mock'
import VueRouter from 'unplugin-vue-router/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer'
import Components from 'unplugin-vue-components/vite'
import { compression } from 'vite-plugin-compression2'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import { devConf } from './config'

export default function setupPlugin() {
  const plugins: Array<PluginOption | PluginOption[]> = [

    tsconfigPaths({
      projects: ['./tsconfig.app.json'],
      loose   : true,
    }),

    viteMockServe(),
    ViteRestart({ restart: ['src/styles/theme/*.less'] }),

    UnoCSS(),

    Components({
      dirs                : ['src/components', 'src/directives'],
      directoryAsNamespace: true,
      globalNamespaces     : ['global'],
      resolvers           : [
        AntDesignVueResolver({ importStyle: 'less' }),
        {
          type   : 'directive',
          resolve:  (name) => {
            const filename = `${kebabCase(name)}.ts`

            const exist = fs.existsSync(`src/directives/${filename}`)

            return exist ? `@/directives/${filename}` : null
          },
        },
      ],
    }),
    VueRouter({
      extensions: ['.page.vue'],
    }),
    vue(),
    vueJsx({ optimize: true, transformOn: true }),

    imagetools(),
    viteStaticCopy({
      targets: [
        { src: 'config.json', dest: '' },
      ],

    }),

    vueDevTools({
      componentInspector: true,
      launchEditor      : 'code',
    }),
  ]

  if (devConf.https) {
    plugins.push(basicSsl({ name: 'dev', domains: ['*.com'] }))
  }

  if (process.env.VITE_INSPECT === 'true') {
    plugins.push(Inspect({
      build    : true,
      outputDir: '.vite-inspect',
    }))
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
    }))
  }

  return plugins
}
