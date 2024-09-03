import { defineConfig, presetAttributify, presetUno, transformerDirectives } from 'unocss'

import { themeParse } from './build/util/theme'

export default defineConfig({

  presets: [
    presetUno(),
    presetAttributify({
      prefix      : 'un-',
      prefixedOnly: true,
    }),
  ],

  transformers: [
    transformerDirectives({
      applyVariable: ['--at-apply', '--uno-apply', '--uno'],
    }),
  ],

  theme: {
    colors: {
      ...themeParse().def,
    },
    screens: {
    },
  },
})
