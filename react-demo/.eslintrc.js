module.exports = {
  parser: '@typescript-eslint/parser', // 定义ESLint的解析器
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint', // 使得@typescript-eslint中的样式规范失效，遵循prettier中的样式规范
    'plugin:prettier/recommended', // 使用prettier中的样式规范，且如果使用ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出
  ], // 定义文件继承的子规范
  plugins: ['@typescript-eslint'], // 定义了该eslint文件所依赖的插件
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    // 指定ESLint可以解析JSX语法
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-empty-function': 0,
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        semi: false,
        singleQuote: true,
        trailingComa: 'all',
        bracketSpacing: false,
        arrowParens: 'avoid',
        insertPragma: false,
        tabWidth: 2,
        useTabs: false,
      },
    ],
  },
}
