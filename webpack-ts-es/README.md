## webpack-ts-es npm打包介绍

### 打包工具介绍

#### webpack打包必须工具
* webpack
* webpack-cli
```
yarn add webpack webpack-cli -D
```

#### 合并webpack配置
* webpack-merge
```
yarn add webpack-merge -D
```

#### 编译 /\.(js|ts|tsx)$/
* babel-loader // 指明babel应该编译哪些文件，但并没有指明编译成什么样，需要结合其他插件支持
* @babel/core // babel的核心功能库
* @babel/preset-env // 对我们所使用的并且目标浏览器中缺少的功能进行代码转换和加载polyfill，将es6转成es5
* @babel/runtime // 引入helper code(辅助函数),解决不转换新API的问题，引入各个浏览器需要的polyfill，且不会像babel-polyfill那样污染全局环境
* @babel/plugin-transform-runtime // 开启对Babel注入的helper code（辅助函数）的复用，以节省代码体积
* @babel/preset-typescript // 转换Typescript代码，解决.d.ts引入问题
* @babel/plugin-transform-react-jsx // 编译转换JSX
```
yarn add babel-loader @babel/core @babel/runtime @babel/plugin-transform-runtime @babel/preset-env @babel/preset-typescript @babel/plugin-transform-react-jsx -D
```

#### eslint规范
(参考eslint规范)[https://segmentfault.com/a/1190000019661168]
(参考tsconfig.json规范)[https://segmentfault.com/a/1190000021749847]
* eslint // ESLint的核心代码
* @typescript-eslint/parser // ESLint的解析器，用于解析typescript，从而检查和规范Typescript代码
* @typescript-eslint/eslint-plugin // 这是一个ESLint插件，包含了各类定义好的检测Typescript代码的规范
* prettier // prettier插件的核心代码
* eslint-config-prettier // 解决ESLint中的样式规范和prettier中样式规范的冲突，以prettier的样式规范为准，使ESLint中的样式规范自动失效
* eslint-plugin-prettier // 将prettier作为ESLint规范来使用
```
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier eslint-config-prettier eslint-plugin-prettier -D
```

#### commit校验
* husky
* lint-staged
* commitlint
* @commitlint/config-conventional
```
yarn add husky lint-staged commitlint @commitlint/config-conventional -D
```

### package.json
``` javascript
{
  "version": "1.0.0", // 当前包版本号
  "main": "./dist/index.js", // npm包入口
}
```