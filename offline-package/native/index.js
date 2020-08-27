/**
 * https://www.geeksforgeeks.org/node-js-fs-readdirsync-method/
 * https://www.geeksforgeeks.org/node-js-fs-statsync-method/
 * https://www.geeksforgeeks.org/node-js-fs-readfilesync-method/
 * https://www.geeksforgeeks.org/node-js-fs-writefile-method/
 * https://www.geeksforgeeks.org/node-js-fs-createwritestream-method/
 */
const fs = require('fs')
// node加密模块 https://juejin.im/post/6844903618382921735
const crypto = require('crypto')
// 打包模块 https://www.npmjs.com/package/archiver
const Archiver = require('archiver')

const env = (process.argv.length > 2 && process.argv[2]) || 'dev'
const {filePath, name, localCacheConfig} = require('./config')

console.log('当前环境:', env)

const fileList = []

function replacePath(dir) {
  return dir.replace(filePath, '')
}

// 遍历dist文件夹
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
    // if (item === '.DS_Store') {
    //   // console.log('aaa11 ', fs.statSync(`${path}/${item}`))
    // }
  })
}

// function sh(filename) {
//   const content = `curl -F "zipFile=@${filename}" -F "filename=${filename}"  ${uploadUrl}`
//   fs.writeFile(filePath + '/' + 'upload.sh', content, 'utf-8', function (err) {
//     if (err) throw err
//     // console.log('写入成功')
//   })
// }

// function writeManifestHash() {
//   // 获取文件md5
//   const buffer = fs.readFileSync(`${filePath}/manifest.json`)
//   const fsHash = crypto.createHash('md5')
//   fsHash.update(buffer)
//   const md5 = fsHash.digest('hex')
//   const manifestHash = {
//     hash: md5,
//     name,
//     zip: true,
//     localCacheConfig: localCacheConfig[env] || localCacheConfig['dev'],
//   }
//   fs.writeFile(
//     `${filePath}/manifest-hash.json`,
//     JSON.stringify(manifestHash, null, 2),
//     {
//       encoding: 'utf-8',
//     },
//     err => {
//       if (err) {
//         console.log('写入manifest-hash.json出错', err)
//         throw err
//       }
//       zip()
//     },
//   )
// }

// 生成 zip-hash.json 文件
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

// 打包
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
        writeZipHash()
      }
    })
  })
  archive.pipe(output)
  archive.directory(`${filePath}`, name)
  archive.finalize()
}

// 生成 manifest-config.json 文件
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
      zip()
    },
  )
}

// 生成manifest.json文件
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
      writeManifestConfig()
    },
  )
}

walk(filePath)
writeManifest()
