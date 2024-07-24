import { viteStaticCopy } from 'vite-plugin-static-copy';

import { definePlugin } from '../../type/vite';

export default definePlugin(() => {
  return viteStaticCopy({
    flatten: false,
    targets: [
      { src: 'config.json', dest: '' },
      //  TODO:缺陷，无法匹配到asset下的直接子文件
      { src: 'src/asset/!(style)/**/*', dest: './' }

      //  glob 匹配 asset 目录中非style的所有文件/目录

    ]
  });
});

