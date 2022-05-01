import type { Plugin } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { definePlugin } from '../../../build/type/vite';

export default definePlugin((mode) => {
  return (createHtmlPlugin({
    minify: mode === 'production',
    template: 'index.html',
    entry: '/src/main.ts',
    inject: { data: {} }
  }) || []) as Plugin[];
});

