import * as Koa from 'koa'
import * as fs from 'fs'
import * as path from 'path'
// import * as bodyParser from 'koa-bodyparser'

const content = require('./util/content')
const mimes = require('./util/mimes')

const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const koaStatic = require('koa-static')
const views = require('koa-views')
const inspect = require('util').inspect

console.log('aa', inspect)

const app = new Koa()

// 使用ctx.body解析中间件
app.use(bodyParser())

// 子路由1
const home = new Router()
home.get('/', async (ctx: any) => {
  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
  ctx.body = html
})

// 子路由2
let page = new Router()
page.get('/404', async(ctx: any) => {
  ctx.body = '404.page'
}).get('/helloworld', async(ctx: any) => {
  // ctx.body = 'helloworld page'
  console.log(ctx.request.query, ctx.request.querystring)
  // ctx.body = ctx
  let url = ctx.url

  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring

  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring,
    ctx: ctx,
    // req: JSON.stringify(ctx.req)
  }
})

let router = new Router()
router.use('/index', home.routes(), home.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())

// app.use(router.routes()).use(router.allowedMethods())
// app.use(page.routes())

// app.use(async (ctx: any) => {
//   console.log('啊啊啊1', home.routes())
//   console.log('啊啊啊2', page.routes())
//   console.log('啊啊啊3', home.allowedMethods())
//   console.log('啊啊啊4', page.allowedMethods())
//   ctx.body = `
//     home.routes:
//       ${home.routes().toString()}
//     page.routes:
//       ${page.routes().toString()}
//   `
// })

function parsePostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postdata = ''
      ctx.req.addListener('data', (data) => {
        postdata += data
      })
      ctx.req.addListener('end', () => {
        let parseData = parseQueryStr(postdata)
        resolve(parseData)
      })
    } catch(err) {
      reject(err)
    }
  })
}

function parseQueryStr(queryStr) {
  console.log('post数据', queryStr)
  let queryData = {}
  let queryStrList = queryStr.split('&')
  console.log('queryStrList', queryStrList)
  for(let queryStrItem of queryStrList){
    let itemList = queryStrItem.split('=')
    queryData[itemList[0]] = decodeURIComponent(itemList[1])
  }
  console.log('queryData', queryData)
  return queryData
}

// app.use(async(ctx: any) => {
//   if(ctx.url === '/?d=test' && ctx.method === 'GET') {
//     // 当GET请求时候返回表单页面
//     let html = `
//       <h1>koa2 request post demo method: ${ctx.method}</h1>
//       <form method="POST" action="/?d=test">
//         <p>userName</p>
//         <input name="userName" /><br/>
//         <p>nickName</p>
//         <input name="nickName" /><br/>
//         <p>email</p>
//         <input name="email" /><br/>
//         <button type="submit">submit</button>
//       </form>
//     `
//     ctx.body = html
//   } else if (ctx.url === '/?d=test' && ctx.method === 'POST') {
//     // let postData = await parsePostData(ctx)
//     // 当POST请求时，中间件koa-bodyparser解析POST表单里的数据，并显示出来
//     const postData = ctx.request.body
//     ctx.body = postData
//   } else {
//     // 其他请求显示404
//     ctx.body = '<h1>404！！！ o(╯□╰)o</h1>'
//   }
// })

const staticPath = './static'

// 解析资源类型
function parseMime( url ) {
  let extName = path.extname( url )
  extName = extName ?  extName.slice(1) : 'unknown'
  return  mimes[ extName ]
}

// app.use(async(ctx: any) => {
//   // 静态资源目录在本地的绝对路径
//   let fullStaticPath = path.join(__dirname, staticPath)

//   // 获取静态资源内容，有可能是文件内容，目录，或404
//   let _content = await content(ctx, fullStaticPath)

//    // 解析请求内容的类型
//   let _mime = parseMime(ctx.url)

//   // 如果有对应的文件类型，就配置上下文的类型
//   if ( _mime ) {
//     ctx.type = _mime
//   }

//   // 输出静态资源内容
//   if(_mime && _mime.indexOf('image/') >= 0) {
//     // 如果是图片，则用node原生res，输出二进制数据
//     ctx.res.writeHead(200)
//     ctx.res.write(_content, 'binary')
//     ctx.res.end()
//   } else {
//     // 其他则输出文本
//     ctx.body = _content
//   }
// })

// app.use(koaStatic(
//   path.join(__dirname, staticPath)
// ))

// app.use(async (ctx) => {
//   if(ctx.url === '/index') {
//     ctx.cookies.set(
//       'cid',
//       'hello world',
//       {
//         domain: 'localhost', // 写cookie所在的域名
//         path: '/index', // 写cookie所在的路径
//         maxAge: 10 * 60 * 1000, // cookie有效时长
//         expires: new Date('2020-09-09'), // cookie失效时间
//         httpOnly: false, // 是否只用于http请求中获取
//         overwrite: false, // 是否允许重写
//       }
//     )
//     ctx.body = 'cookie is ok'
//   } else {
//     ctx.body = 'hello world'
//   }
// })

// app.use(views(path.join(__dirname, './view'), {
//   extension: 'ejs'
// }))

// app.use(async (ctx) => {
//   let title = 'hello koa2'
//   await ctx.render('index', {
//     title
//   })
// })

app.use((ctx) => {
  ctx.body = ctx
  console.log('嗷嗷的', ctx.req)
})

app.listen(3002)

console.log('[demo start-quick is starting at port 3002')