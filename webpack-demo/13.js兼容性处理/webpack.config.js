const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      /**
       * js兼容性处理：babel-loader @babel/core @babel/preset-env
       *  1.基本js兼容性处理 --> @babel/preset-env
       *    问题：只能转换基本语法，如promise不能转换
       *  2.全部js兼容性处理 --> @babel/polyfill
       *    问题：我只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大
       *  3.需要做兼容性处理的就做：按需加载 --> corejs
       */
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎样的兼容性处理
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  edge: '17',
                  firefox: '60',
                  chrome: '67',
                  safari: '11.1',
                  ie: '8',
                },
                // 按需加载
                // 使用usage目前还有兼容性问题，比如不会对原型上的方法比如[].includes()这个新Api做转译
                useBuiltIns: 'usage', // entry usage
                // 使用@babel/runtime和@babel/plugin-transform-runtime会自动引入core-js
                // 但2020.12.23自动引入的core-js版本是2，需要重新安装core-js版本3
                // 指定core-js版本
                corejs: 3,
              },
            ],
          ],
          plugins: [
            ['@babel/plugin-transform-runtime'],
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
