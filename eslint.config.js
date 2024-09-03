import antfu from '@antfu/eslint-config'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
// import vuePug from 'eslint-plugin-vue-pug'

export default antfu(
  {
    vue: {
      overrides: {
        'vue/require-typed-ref'                      : 'error',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/block-lang'                             : [
          'error',
          {
            script: { lang: 'ts' },
            // template: { lang: 'pug' },
            style : { lang: 'less' },
          },
        ],
      },
    },
    typescript: {
      overrides: {
        'style/semi'                   : ['error', 'never'],
        'unused-imports/no-unused-vars': 'off',
        'no-console'                   : 'off',
        'ts/no-unused-expressions'     : 'off',

        // 'ts/method-signature-style': 'off',
        // 'ts/no-empty-object-type': 'off',
      },
    },
  },
  {
    rules: {
      'style/key-spacing': ['error', {

        align: {
          mode       : 'minimum',
          beforeColon: false,
          afterColon : true,
          on         : 'colon',
        },
        multiLine: {
          beforeColon: false,
          afterColon : true,
        },
      }],
      'style/no-multi-spaces'        : 'off',
      'style/type-annotation-spacing': 'off',

    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'antfu/top-level-function': 'off',
    },
  },
  {
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
    rules: {

      'import/order'              : 'off',
      'sort-imports'              : 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },

)
