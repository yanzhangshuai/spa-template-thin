import type { Plugin } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import type { PluginFn } from '../../../build/type/vite';

export const htmlPlugin: PluginFn = (mode) => {
  return (createHtmlPlugin({
    minify: mode === 'production',
    template: 'index.html',
    entry: '/src/main.ts',
    inject: { data: { } }
  }) || []) as Plugin[];
};
