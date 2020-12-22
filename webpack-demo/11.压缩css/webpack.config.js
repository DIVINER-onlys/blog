const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 设置nodejs环境变量
// process.env.NODE_ENV = 'development'

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          // 创建style标签，将样式插入head中
          // 'style-loader',
          // 这个loaderqu'取代style-loader, 作用： 提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          // 将css文件整合到js文件中
          'css-loader',
          // 使用loader的默认配置
          // 'postcss-loader',
          // 修改loader的配置
          {
            loader: 'postcss-loader',
            options: {
              // All postcss options is now under `postcssOptions
              postcssOptions: {
                 // plugins内使用require时要用
                ident: 'postcss',
                plugins: [
                  // postcss的插件
                  // ['postcss-preset-env', {}],
                  require('postcss-preset-env')()
                ]
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/index.css'
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin({})
  ]
}