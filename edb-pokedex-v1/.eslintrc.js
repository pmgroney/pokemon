const prettierConfig = require('./.prettierrc');

module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  plugins: ['prettier', 'simple-import-sort'],
  rules: {
    'import/no-anonymous-default-export': 'off',
    'prettier/prettier': ['error', prettierConfig], // apply rules from prettier config file
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
};
