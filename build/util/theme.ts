import fs from 'node:fs'
import { globbySync } from 'globby'

type ThemeColor = Recordable<Recordable<string>>

// const COLOR_REGEX = /(?<=@)([^:^;]+)[: ]+/([^:^;]+)(?=;)/g;

/**
 * 解析主题文件
 * @param path
 */
export function themeParse(path = 'src/assets/styles/theme'): ThemeColor {
  // 去除path的最后一个斜杠
  if (path.endsWith('/')) {
    path = path.slice(0, -1)
  }

  const themes: ThemeColor = {}
  const files = globbySync(`${path}/**.less`)

  files.forEach((file) => {
    const name = file.replace(`${path}/`, '').replace('.less', '')

    const res: Recordable<string> = {}

    //  读取文件内容
    const content = fs.readFileSync(file, 'utf-8')

    content.split(';')
      .map(item => item.replace(/(\r\n)|[\r\n\t ]/, ''))
      .filter(item => item && !item.startsWith('//'))
      .forEach((item) => {
        const match = /(?<=@)(\w+):([\w#(,)]+)/.exec(item)

        if (match) {
          res[match[1].trim()] = match[2].trim()
        }
      })

    themes[name] = res
  })

  return themes
}
