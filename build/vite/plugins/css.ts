import WindiCSS from 'vite-plugin-windicss';
import type { PluginFn } from '../../../build/type/vite';

export const cssPlugin: PluginFn = () => {
  return WindiCSS();
};
