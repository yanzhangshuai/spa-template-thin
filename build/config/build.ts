import type { ManualChunkMeta, PreRenderedAsset, PreRenderedChunk } from 'rollup'
import type { BuildOptions } from 'vite'

import { defineX } from '../config'

export default defineX<BuildOptions>({
  target: 'es2015',
  chunkSizeWarningLimit: 500,
  rollupOptions: {
    output: {
      entryFileNames,
      chunkFileNames,
      assetFileNames,
      // TODO: manualChunks 有问题,
      // manualChunks,
    },
  },
})

function entryFileNames(_: PreRenderedChunk) {
  return 'js/[name].[hash].js'
}

function chunkFileNames(_: PreRenderedChunk) {
  return 'js/[name].[hash].js'
}

function assetFileNames(c: PreRenderedAsset) {
  if (/\.css$/.test(c?.name || '')) {
    return 'css/[name].[hash].[ext]'
  }

  return 'assets/[name].[hash].[ext]'
}

function manualChunks(id: string, _: ManualChunkMeta): string {
  if (id.includes('node_modules')) {
    return /[\\/]node_modules[\\/](@)?vue/.test(id) ? '_v' : '_l'
  }

  if (id.includes('/src/page')) {
    return id.match(/src\/page\/(\w+)\//)?.[1] || 'page'
  }

  return 'index'
}
