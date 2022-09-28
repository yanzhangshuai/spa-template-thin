import compressionPlugin from './plugins/compression';
import cssPlugin from './plugins/css';
import htmlPlugin from './plugins/html';
import reportPlugin from './plugins/report';
import vuePlugin from './plugins/vue';

import type { Env } from '../type/env';
import type { Mode, PluginFn } from '../type/vite';
import type { Plugin } from 'vite';

export function createVitePlugins(mode: Mode, viteEnv: Env): Array<Plugin | Plugin[]> {
  const plugins: Array<PluginFn> = [
    vuePlugin,
    cssPlugin,
    htmlPlugin,
    compressionPlugin,
    reportPlugin
  ];

  return plugins.map(plugin => plugin(mode, viteEnv));
}
