import { resolve } from 'path';
import { compilerOptions } from '../../tsconfig.json';

const ALIAS_REGEX = /^.+(?=\/\*)/;

type AliasKey = typeof compilerOptions.paths;
/**
 *  扫描tsconfig.json 根据paths属性获取alias
 * @returns
 */
export function alias() {
  const paths: Record<string, string> = {};

  Object.keys(compilerOptions.paths).forEach((key) => {
    const path: Array<string> = compilerOptions.paths[key as keyof AliasKey];

    if (!Array.isArray(path))
      return;
    const aliasName = key.match(ALIAS_REGEX)?.[0];

    const aliasPath = path?.[0].match(ALIAS_REGEX)?.[0];
    if (!aliasName || !aliasPath)
      return;

    paths[aliasName] = resolve(compilerOptions.baseUrl, aliasPath);
  });

  return paths;
}
