const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const baseConfig = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/public/', // 影响的是代码的资源引用路径，加前缀
  },
  module: {
    rules: [
      {
        test: /\.(css|less|scss)$/,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader', 'less-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false, // 设置成false的原因 https://segmentfault.com/a/1190000021360248
            name: '[name].[hash].[ext]',
            limit: 0,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  devServer: {
    port: 8080,
    hot: true,
    contentBase: [path.join(__dirname, 'public')],
    historyApiFallback: true, // 在使用单页面应用的时候，需要设置此参数，代表如果访问除根路径以外的地址，最终都会转向去请求根路径
    // contentBasePublicPath: path.join(__dirname, 'public'),
    // publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
}

module.exports = env => {
  console.log('当前模式', env)

  return merge(baseConfig, {})
}
