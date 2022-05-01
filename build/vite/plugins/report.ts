import visualizer from 'rollup-plugin-visualizer';
import type { PluginFn } from '../../../build/type/vite';

export const reportPlugin: PluginFn = (_mode, env) => {
  if (!env.VITE_REPORT)
    return [];

  return visualizer({
    open: true,
    gzipSize: true,
    brotliSize: true,
    template: 'treemap', // "sunburst" | "treemap" | "network",
    filename: './report/libs/index.html'
  });
};
