import antfu from '@antfu/eslint-config'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default antfu(
  {
    vue: true,
    typescript: true,
  },
  {
    // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
    files: ['**/*.vue'],
    settings: {
      'import/core-modules': ['vue-router/auto-routes'],
    },
    rules: {
      'vue/operator-linebreak': ['error', 'before'],
    },
  },
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    // Without `files`, they are general rules for all files
    rules: {
      'style/semi': ['error', 'never'],
      'unused-imports/no-unused-vars': 0,
      'ts/no-unused-expressions': 0,
      'no-console': 0,
      'ts/method-signature-style': 0,
      'ts/no-empty-object-type': 0,
      'regexp/no-unused-capturing-group': 0,
      'regexp/no-misleading-capturing-group': 0,
      'regexp/no-super-linear-backtracking': 0,
      'import/order': 'off',
      'sort-imports': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
)
