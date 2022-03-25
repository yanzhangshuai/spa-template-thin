import { Env } from '../type/env';
import { Plugin, ProxyOptions } from 'vite';


export type PluginFn = (isBuild?: boolean, env?: Env) => Plugin | Plugin[];

export type ProxyTarget = Record<string, ProxyOptions>;



