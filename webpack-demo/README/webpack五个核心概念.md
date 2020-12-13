### Webpack五个核心概念

#### entry
入口（entry）指示 `webpack` 以哪个文件为入口起点开始打包，分析构建内部依赖图

#### output
输出（output）指示 `webpack` 打包后的资源 `bundles` 输出到哪里去，以及如何命名

#### loader
loader 让 `webpack` 能够去处理那些非 `javascript` 文件（webpack自身只理解JavaScript），loader主要是对文件进行翻译，比如less转为为css，ts转为js

#### plugins
插件（plugins）可以用于执行访问更广的任务，插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等

#### mode
模式（mode）指示 `webpack` 使用相应模式的配置
| 选项 | 描述 | 特点 |
| :-- | :-- | :-- |
| development | 会将 `process.env.NODE_ENV` 的值设为 `development`,<br/> 启用 `NamedChunksPlugin` 和 `NamedModulesPlugin` | 能让代码本地调试运行的环境 |
| production | 会将 `process.env.NODE_ENV` 的值设为 `production`，<br/> 启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`,`ModuleConcatenationPlugin`,`NoEmitOnErrorsPlugin`,`OccurrenceOrderPlugin`,`SideEffectsFlagPlugin`和`UglifyJsPlugin` | 能让代码优化上线运行的环境 |


### 笔记
* 开发环境： `webpack ./src/index.js -o ./dist --mode=development`,webpack会以`./src/index.js`为入口文件开始打包，打包后输出到`./dist`下，整体打包环境是开发环境
* 生产环境：  `webpack ./src/index.js -o ./dist --mode=production`,webpack会以`./src/index.js`为入口文件开始打包，打包后输出到`./dist`下，整体打包环境是生产环境
* `webpack`能处理`js/json`资源，不能处理`css/img`等其他资源
* 生产环境比开发环境多了压缩js代码的功能，也包括了`treeshaking`，