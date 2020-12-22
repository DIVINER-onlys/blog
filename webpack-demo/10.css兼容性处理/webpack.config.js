const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
          /**
           * css 兼容性处理： postcss --> postcss-loader  postcss-preset-env
           * postcss-preset-env帮postcss找到package.json中的browserslist里面的配置，通过配置加载指定的css兼容性样式
           * 
            "browserslist": {
              // 开发环境 --> 设置node环境变量： process.env.NODE_ENV = development
              "development": [
                "last 1 chrome version",
                "last 1 firefox version",
                "last 1 safari version"
              ],
              // 生成环境，默认是生产环境的
              "production": [
                ">0.1%",
                "not dead",
                "not op_mini all"
              ]
            }
           */
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
  ]
}