import helper from 'vue-component-volar';

import path from 'path';

import build from 'vue-docgen-web-types/lib/build';

const componentPath = path.join(__dirname, '../');

helper({
  globs: path.join(componentPath, 'modules/**/*.{vue,tsx}').replace(/\\/g, '/'),
  output: path.join(componentPath, 'shims-volar.d.ts').replace(/\\/g, '/'),
  prefixPath: './modules',
  prefixName: '',
  tabWidth: 2,
  ignoreExt: ['tsx'],
  namingStyle: 'hyphen',
  semi: false,
  singleQuote: true
});

build({
  components: './**/*.{vue,tsx}',
  componentsRoot: '../modules',
  outFile: '../web-types.json',
  packageName: '',
  packageVersion: '',
  watch: false,
  cwd: '.'
}).then((data) => {
  console.log('web-types-succeed');
}).catch((err) => {
  console.log('web-types-fail', err);
});
