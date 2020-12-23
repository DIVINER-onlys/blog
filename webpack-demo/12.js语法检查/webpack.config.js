const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      /**
       * 语法检查：eslint-loader  eslint
       * 注意：只检查自己写的源代码，第三方的库是不用检查的
       * 设置检查规则：
       *    package.json中eslintConfig中设置
            "eslintConfig": {
              "extends": "airbnb-base"
            }
       *    airbnb --> eslint-config-airbnb-base eslint eslint-plugin-import
       */
      {
        test: /\.(js|ts|tsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          // 自动修复eslint的错误
          fix: true,
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
