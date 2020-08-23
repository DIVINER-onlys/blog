### Babel剖析
最近在封装一个`JS-SDK`包涉及到打包，所以趁机会探寻下`babel`的打包原理以及我们需要使用到`babel`的哪些npm包

#### Babel是什么
这个问题我这边使用官网的话来描述就是 `Babel是一个JavaScript编译器`，主要用于将ECMAScript2015+版本的代码转换为向后兼容的JavaScript语法，babel为我们做了
* 语法转换
* 通过polyfill方式在目标环境中添加缺失的特性
* 源码转换

#### 一般我们需要babel的哪些npm包
我一开始一直想找一般我们需要安装哪些babel，除了必要的几个包外，其实在我们打包的时候缺少什么就添加什么，下面用到
* babel-loader // 指明babel应该编译哪些文件，但并没有指明编译成什么样，需要结合其他插件支持
* @babel/core // babel的核心功能库
* @babel/preset-typescript / 转换Typescript代码