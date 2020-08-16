const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, './src/app.ts'),
  },
  output: {
    // libraryTarget: 'umd',
    path: __dirname + '/dist',
    filename: 'index.js',
    library: 'blog',
  },
}
