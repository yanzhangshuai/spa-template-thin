import vuePlugin from './plugins/vue';
import cssPlugin from './plugins/css';
import htmlPlugin from './plugins/html';
import staticFile from './plugins/static';
import reportPlugin from './plugins/report';
import compressionPlugin from './plugins/compression';

import type { Env } from '../type/env';
import type { Mode, PluginFn } from '../type/vite';
import type { Plugin } from 'vite';

export function createVitePlugins(mode: Mode, viteEnv: Env): Array<Plugin | Plugin[]> {
  const plugins: Array<PluginFn> = [
    staticFile,
    vuePlugin,
    cssPlugin,
    htmlPlugin,
    compressionPlugin,
    reportPlugin
  ];

  return plugins.map(plugin => plugin(mode, viteEnv));
}
