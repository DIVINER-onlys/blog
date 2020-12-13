/**
 * webpack.config.js webpack的配置文件
 * 作用：指示 webpack 干哪些活（当你运行 webpack 指令时，会加载里面的配置）
 * 所有构建工具都是基于 nodejs 平台运行的，模块化默认采用commonjs
 */
const path = require('path')

 module.exports = {
   // webpack配置
   mode: 'development',
  //  mode: 'production',
   // 起点
   entry: './src/index.js',
  //  entry: {
  //    apps: path.resolve(__dirname, './src/index.js')
  //  },
   // 输出
   output: {
     filename: 'index.js',
     path: path.resolve(__dirname, 'dist')
   },
   module: {
     // 详细的loader配置
     // 不同文件必现配置不同loader处理
     rules: [
       {
         // 匹配哪些文件
         test: /\.(scss|less|css)$/,
         // 使用哪些loader进行处理,use数组中的laoder执行顺序： 从右向左，从下到上依次执行
         use: [
           'style-loader', // 创建style标签，将js中的样式资源插入，添加到head中生效
           'css-loader', // 将css文件以字符串的形式变成commonjs模块加载到js中，里面内容是样式字符串
           'less-loader', // 将less文件编译成css文件,需要下载less-loader 和 less
           'sass-loader', // 将sass文件编译成css文件，需要下载sass-loader 和 sass 和 node-sass
         ]
       }
     ]
   },
   // 详细的plugins配置
   plugins: []
 }