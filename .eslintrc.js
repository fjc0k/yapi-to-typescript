/** @type import('haoma').ESLintConfig */
module.exports = require('haoma').getESLintConfig({
  overrides: [
    {
      files: ['src/templates/**/*'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
})
