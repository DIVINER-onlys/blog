const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 定义nodejs环境变量，决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            // 还需要在package.json中定义browserslist
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-preset-env')(),
              ],
            },
          },
          'sass-loader',
        ],
      },
      /**
       * 正常来讲，一个文件只能被一个loader处理
       * 当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
       * 先执行eslint 再执行babel
       */
      {
        // 在package.json中eslintConfig --> airbnb
        // "eslintConfig": {
        //   "extends": "airbnb-base"
        // }
        test: /.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true,
        },
      },
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
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
                useBuiltIns: 'usage',
                corejs: 3,
              }
            ]
          ]
        }
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 *1024,
          name: '[name].[hash:10].[ext]',
          outputPath: 'imgs',
        },
      },
      {
        test: /.html$/,
        loader: 'html-loader',
      },
      {
        // 处理其他资源，如字体资源
        exclude: /.(js|css|scss|html|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'media',
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'css/index.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
};
