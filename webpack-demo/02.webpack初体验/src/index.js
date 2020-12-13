/**
 * ### 笔记
 * 开发环境： `webpack ./src/index.js -o ./dist --mode=development`,webpack会以`./src/index.js`为入口文件开始打包，打包后输出到`./dist`下，整体打包环境是开发环境
 * 生产环境：  `webpack ./src/index.js -o ./dist --mode=production`,webpack会以`./src/index.js`为入口文件开始打包，打包后输出到`./dist`下，整体打包环境是生产环境
 * `webpack`能处理`js/json`资源，不能处理`css/img`等其他资源
 * 生产环境比开发环境多了压缩js代码的功能，也包括了`treeshaking`，
 */

import data from './data.json'
// import './index.css'

console.log(data)
function add(x,y) {
  return x + y
}

console.log(add(1,2))