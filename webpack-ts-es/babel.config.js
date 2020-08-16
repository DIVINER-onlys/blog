const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.1',
        ie: '11',
      },
      useBuiltIns: 'usage', // 根据配置的浏览器兼容，按需添加代码中使用到的api来进行polyfill引入
      corejs: 3,
    },
  ],
  ['@babel/preset-typescript'],
]

const plugins = [
  [
    '@babel/plugin-transform-runtime',
    // {
    //   corejs: 3,
    // },
  ],
  // [''],
  ['@babel/plugin-transform-react-jsx'],
]

module.exports = {presets, plugins}
