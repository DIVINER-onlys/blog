/**
 * loader: 1.下载   2.使用（配置loader）
 * plugins：1.下载  2.引入   3.使用
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // loader的配置
    ]
  },
  plugins: [
    // plugins的配置
    // 功能：默认创建UI个空的html文件，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html'文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html'
    })
  ]
}