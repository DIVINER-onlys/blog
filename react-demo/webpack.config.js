const {merge} = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const baseConfig = {
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        exclude: /(node_modules)/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    alias: {
      'src': path.resolve(__dirname, './src')
    }
  },
  devServer: {
    port: 8080,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}


module.exports = env => {
  console.log('当前模式', env)

  return merge(baseConfig, {})
}