## H5离线包方案实现

### 背景
在现在全球化业务的趋势下，国外的网络环境并不像国内那么的完善，在app内嵌的h5页面加载速度是又有需求，即使我们的域名上了全球cdn，页面的加载也有时候不那么可观，因此，我们需要一种方案来解决页面的首屏加载速度问题，我们的方案就是`离线包方案`，让客户端提前把我们的页面资源缓存到app内

### 我们需要做什么
我们需要做的是把我们的h5的资源，通过定一个校验约定和版本约定，让客户端能按照我们的约定校验资源，加载资源

### 我们做缓存的目的
访问一个url加载一个页面资源，需要加载
* `js`
* `css`
* `图片、字体资源`
* `额外引入的polyfill`
* `接口数据`
等等资源，我们要做的就是将除去`接口数据`外的其他资源在打开app进入时加载，缓存在本地，在打开url时，直接加载本地资源，节省加载除去`接口数据`外的资源加载时间

### 最终能达到什么效果
我们先看下在不同网络下，我们`css`和`js`资源的加载时间
<!-- https://ibb.co/rfmzPGv -->
* 在4g网络下，我们加载页面的`css`和`js`资源需要的时间,大概需要200-300ms
![4g网络](https://i.ibb.co/Wp6M9Ws/online.png)

<!-- https://ibb.co/3dy7ZNz -->
* 在fast3G网络下，我们加载页面的`css`和`js`资源需要的时间,大概需要13-14s
![fast3G网络](https://i.ibb.co/qjMdQs5/fast3G.png)

<!-- https://ibb.co/gz36zFG -->
* 在slow3G网络下，我们加载页面的`css`和`js`资源需要的时间,大概需要40-50s
![slow3G网络](https://i.ibb.co/4P7JPgc/slow3G.png)


如果在网络正常良好的情况下，我们加载css和js资源的时间处于可以接受的状态，但如果网络状态不乐观时，要显示首屏这个加载时间就无法接受了（而且还没算上图片资源加载时间），而海外网络的不确定性，所以缓存策略可以说就很有必要了


### dist包主要目录
``` 
dist
  |
  |--static
  |   |--css
  |   |--js
  |   |--assets
  |--index.html
  |--polyfill
  |--manifest.json
  |--manifest-config.json
  |--efox-pay-package.zip
  |--zip-hash.json
```


### 如何实现
#### 前端流程
![前端流程](http://pushmiddle.bs2dl.yy.com/nativea.png)

##### 遍历dist文件夹将文件信息存储在fileList中

###### fileList子项参数解析
| 字段 | 含义 |
| :--: | :--: |
| file | 当前文件路径，用于客户端解析判断zip包文件是否缺失，并且通过文件路径获取文件大小内容 |
| length | 当前文件大小，用于客户端解析判断zip包当前文件内容是否完整 |
| hash | 当前文件内容hash值，用于客户端解析判断zip包当前文件内容是否完整 |
``` javascript
// native/index.js

const fs = require('fs')
const crypto = require('crypto')
const fileList = []

function replacePath(dir) {
  return dir.replace(filePath, '')
}

function walk(path) {
  // 返回指定目录下所有文件名称的数组对象
  const dirList = fs.readdirSync(path)
  dirList.forEach(item => {
    // 返回给定文件路径的文件详细信息
    if (fs.statSync(`${path}/${item}`).isDirectory()) {
      // 如果是文件夹，递归
      walk(`${path}/${item}`)
    } else {
      if (item !== 'manifest.json') {
        // 获取文件md5
        const buffer = fs.readFileSync(`${path}/${item}`) // 读取文件并返回文件内容
        const fsHash = crypto.createHash('md5')
        fsHash.update(buffer)
        const md5 = fsHash.digest('hex') // 文件内容相同会生成相同的md5
        // console.log('md5', md5)

        // 获取文件length
        const buffenInfo = fs.statSync(`${path}/${item}`)
        const length = buffenInfo.size

        // 需要去除路径前面的 ./dist, item只是当前的文件名
        const rpath = replacePath(path)
        const ob = {
          file: `${rpath}/${item}`,
          length: length,
          hash: md5,
        }
        fileList.push(ob)
      }
    }
  })
}

walk(filePath)
// 该函数在下面
writeManifest()
```

##### 将fileList写入dist/manifest.json中
`manifest.json`文件作用：客户端读取其内容校验zip包解压出来的文件是否正常
``` javascript
// native/index.js

function writeManifest() {
  const manifestJson = {
    resources: fileList,
  }
  // 将数据异步写入到文件中，文件存在将被替换
  fs.writeFile(
    `${filePath}/manifest.json`,
    JSON.stringify(manifestJson, null, 2),
    {
      encoding: 'utf-8',
    },
    err => {
      if (err) {
        console.log('写入manifest.json出错', err)
        throw err
      }
      // 该函数在下面
      writeManifestConfig()
    },
  )
}
```

##### 生成manifest-config.json文件，存储基础配置项
###### manifest-config.json参数解析
| 字段 | 含义 |
| :--: | :--: |
| name | zip包名称 |
| localCacheConfig | 基础配置项 |
| ocalCacheConfig.appName | appName:项目名称，可能有多项目使用，做项目配置隔离 |
| localCacheConfig.appName.remotePath | string 当前项目的远程zip包地址 |
| localCacheConfig.appName.domain | Array 当前项目的域名，可能多个，所以为数组 |
| localCacheConfig.appName.indexRouter | Array 当前项目url上的路由，匹配上时加载zip包的 `./index.html`, 没匹配上按路由地址加载zip包的其他静态资源 |
``` javascript
function writeManifestConfig() {
  const manifestConfig = {
    name: name,
    localCacheConfig: localCacheConfig[env] || localCacheConfig['dev'],
  }
  fs.writeFile(
    `${filePath}/manifest-config.json`,
    JSON.stringify(manifestConfig, null, 2),
    {
      encoding: 'utf-8',
    },
    err => {
      if (err) {
        console.log('写入manifest-config.json出错', err)
        throw err
      }
      // 该函数在下面
      zip()
    },
  )
}
```

##### 将dist进行压缩打包，并将zip包放入dist包中
``` javascript
// native/index.js

const Archiver = require('archiver')

function zip() {
  // 创建一个允许大量数据写入文件的可写流
  const output = fs.createWriteStream(`./${name}.zip`)
  const archive = Archiver('zip')
  archive.on('error', err => {
    console.log('打zip包出错', err)
    throw err
  })
  output.on('close', () => {
    console.log('Data has been ziped')
    const buffer = fs.readFileSync(`./${name}.zip`)
    const fsHash = crypto.createHash('md5')
    fsHash.update(buffer)
    const md5 = fsHash.digest('hex')
    // const zipName = `${filePath}/${name}-${md5}.zip`
    const zipName = `${filePath}/${name}.zip`
    // 重命名文件路径
    fs.rename(`./${name}.zip`, zipName, error => {
      if (error) {
        console.log('移动zip包报错', error)
      } else {
        console.log('rename ok')
        // sh(`${name}-${md5}.zip`)
        // 该函数在下面
        writeZipHash()
      }
    })
  })
  archive.pipe(output)
  archive.directory(`${filePath}`, name)
  archive.finalize()
}
```

##### 通过zip包内容生成hash存入dist/zip-hash.json 中
`zip-hash.json`文件作用：客户端每次打开时拉取zip-hash.json， 校验其中的hash值，若不一致，代表前端有发版，需要重新拉取zip包，一致，代表前端无发版，直接使用本地缓存的zip包
###### manifest-hash.json参数解析
| 字段 | 含义 |
| :--: | :--: |
| hash | zip包文件内容的hash值，用于判断当前zip包是否有改变（因为前端打包内容有更新，zip包就会发生改变，那么使用zip包内容生成的hash也会改变，所以可以通过该hash值来判断前端是否有改动） |
| name | zip包名称 |
| localCacheConfig | 基础配置项 |
| ocalCacheConfig.appName | appName:项目名称，可能有多项目使用，做项目配置隔离 |
| localCacheConfig.appName.remotePath | string 当前项目的远程zip包地址 |
| localCacheConfig.appName.domain | Array 当前项目的域名，可能多个，所以为数组 |
| localCacheConfig.appName.indexRouter | Array 当前项目url上的路由，匹配上时加载zip包的 `./index.html`, 没匹配上按路由地址加载zip包的其他静态资源 |

``` javascript
// native/index.js

function writeZipHash() {
  // 获取zip文件md5
  const buffer = fs.readFileSync(`${filePath}/${name}.zip`)
  const fsHash = crypto.createHash('md5')
  fsHash.update(buffer)
  const md5 = fsHash.digest('hex')
  const zipHash = {
    name: name,
    hash: md5,
    localCacheConfig: localCacheConfig[env] || localCacheConfig['dev'],
  }
  fs.writeFile(
    `${filePath}/zip-hash.json`,
    JSON.stringify(zipHash, null, 2),
    {
      encoding: 'utf-8',
    },
    err => {
      if (err) {
        console.log('写入zip-hash.json出错', err)
        throw err
      }
    },
  )
}
```


##### 小结
到这里，我们原本的dist包里面按步骤多了四个文件
* `manifest.json` // 客户端校验zip包文件数量或者文件内容是否有缺失
* `manifest-config.json` // 客户端需要的一些基础配置项信息
* `package.zip` // 我们的zip包，内部比原本的dist包多了`manifest.json`和`manifest-config.json`两个文件
* `zip-hash.json` // 客户端校验zip是否有更新,远程zip包地址


###### 运行下面指令生成dist包，并且生成zip包
``` javascript
// 指令可以配置到`.gitlab-ci.yml`下根据环境运行
yarn build && node native/index dev
```
后续部署前端就完成


#### 客户端流程
![客户端流程图](http://pushmiddle.bs2dl.yy.com/zip-hash.json.png)

+ 每次进入app时加载`zip-hash.json`
  + 比较hash值
	  + 不同，加载remotePath得到zip包
		  + zip包通过md5生成hash,和zip-hash.json中的hash比较
			  + 不同，zip包损坏，移除zip包，访问线上
			  + 相同，解压zip包，遍历manifest.json文件，判断resources每个子项file路径是否存在，并且判断每个文件length和hash是否一致
				  + 都存在, url访问时，通过manifest-confg.json文件基础信息，根据url进行正则匹配
					  + url域名存在于domain中
						  + url路径路由匹配indexRouter
							  +	加载 "file": "/index.html"
						  + url路径匹配indexRouter不存在， 判断url路由是否存在于resources子项中
							  + 存在，根据路径加载本地资源
							  + 不存在，加载线上资源
			    + 有缺少，加载包有问题，移除zip包，访问线上页面
	  + 相同，资源没更新，使用旧包

##### 小结
除了文件完整性校验校验外,url匹配规则
* 域名匹配得上就加载本地
  * indexRouter匹配得上加载index.html，匹配不上根据路径加载本地资源

#### 源码
[源码](https://github.com/DIVINER-onlys/blog/blob/master/offline-package/native/index.js)

[github](https://github.com/DIVINER-onlys)