/**
 * 开发环境配置：能让代码跑起来
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
  },
  module: {
    rules: [
      // loader的配置
      // 处理css资源
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      // 处理图片资源
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[name].[hash:10].[ext]',
          outputPath: 'imgs',
        },
      },
      // 处理html中的img资源
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      // 处理其他资源
      {
        loader: 'file-loader',
        exclude: /\.(html|js|css|scss|jpg|png|gif)$/,
        options: {
          name: '[name].[hash:10].[ext]',
          outputPath: 'iconfont',
        }
      },
    ]
  },
  plugins: [
    // plugins的配置
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3003,
    // open: true,
  }
}