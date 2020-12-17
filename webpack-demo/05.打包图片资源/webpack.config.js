const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        // 问题：处理不了html中的图片
        // 处理图片资源
        test: /\.(jpg|png|gif)$/,
        // 下载url-loader 和 file-loader, url-loader功能基于file-loader
        loader: 'url-loader',
        options: {
          // 图片大小小于8kb，就会被base64处理
          // 优点：减少请求数量
          // 缺点： 图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          // 问题: 因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
          // 解析时会出问题
          // 解决： 关闭url-loader的es6模块，使用commonjs解析
          // esModule: false, // webpack5不用配置该项
          // [name]文件名称
          // [hash:10]取图片的hash的前10位
          // [ext]取文件原本的扩展名
          name: '[name].[hash:10].[ext]',
        }
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}