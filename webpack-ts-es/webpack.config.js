const {merge} = require('webpack-merge')
const productionConfig = require('./webpack.prod.conf')
const developmentConfig = require('./webpack.dev.config')
const path = require('path')
const webpack = require('webpack')

const baseConfig = {
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      h: ['dom-chef', 'h'],
    }),
  ],
}

module.exports = env => {
  let config = env === 'production' ? productionConfig : developmentConfig
  console.log('当前模式:', env, config)
  return merge(baseConfig, config) // 合并 公共配置 和 环境配置
}
