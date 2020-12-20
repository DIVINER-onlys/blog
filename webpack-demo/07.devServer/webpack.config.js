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
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      // 打包其他资源(除了html/js/css资源以外的资源)
      {
        loader: 'file-loader',
        // 排除css/js/html资源
        exclude: /\.(css|js|html)$/,
        options: {
          name: '[name].[hash:10].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  // 问题：webpack-cli version4和webpack version5 目前无法使用webpack-dev-server，改用@webpack-cli/serve
  // 开发服务器 devServer: 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点： 只会在内存中编译打包，不会有任何输出
  // 启动devServer指令为： webpack-dev-server
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    // 启用gzip压缩
    compress: true,
    // 端口号
    port: 3003,
    // 自动打开浏览器
    // open: true,
  }
}