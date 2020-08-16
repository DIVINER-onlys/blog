const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, './src/app.ts'),
  },
  output: {
    libraryTarget: 'amd', // amd和umd模式，umd包含amd和commonJS模式
    path: __dirname + '/dist',
    filename: 'index.js',
    // library: 'webpack_ts_es',
  },
  devtool: 'source-map',
}
