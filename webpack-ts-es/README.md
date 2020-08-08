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
* babel-loader
* @babel/core
<!-- * @babel/runtime
* @babel/preset-env -->
* @babel/preset-typescript // 解决.d.ts引入问题
```
yarn add babel-loader @babel/core @babel/runtime @babel/preset-env @babel/preset-typescript -D
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