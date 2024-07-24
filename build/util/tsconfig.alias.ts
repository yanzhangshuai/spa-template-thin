import { resolve } from 'node:path'

import ts from 'typescript'

const ALIAS_REGEX = /^.+(?=\/\*)/

/**
 * @description: 读取tsconfig.json中的paths配置,转为alias配置
 * @param fileName {string} tsconfig.json文件名
 * @param alias {Record<string, string>} alias配置
 */
export function tsconfigAlias(fileName: string = 'tsconfig.json', alias: Record<string, string> = {}): Record<string, string> {
  //  读取tsconfig.json
  const filename = ts.findConfigFile('./', ts.sys.fileExists, fileName)

  if (!filename)
    return Object.assign({}, alias)

  const configFile = ts.readConfigFile(filename, ts.sys.readFile)

  const { options } = ts.parseJsonConfigFileContent(configFile.config, ts.sys, './')

  if (!options)
    return Object.assign({}, alias)

  const targetAlias: Record<string, string> = Object.assign({}, alias || {})

  //  遍历解析paths属性
  Object.keys(options?.paths || {}).forEach((key) => {
    const path = options?.paths?.[key]

    if (!Array.isArray(path))
      return

    const aliasName = key.match(ALIAS_REGEX)?.[0]

    const aliasPath = path?.[0].match(ALIAS_REGEX)?.[0]

    if (!aliasName || !aliasPath)
      return

    targetAlias[aliasName] = resolve(options?.baseUrl || '', aliasPath)
  })

  return targetAlias
}
