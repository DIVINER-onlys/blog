// https://juejin.im/post/6844903869995024397
export function debounce(fn: Function, delay: number, immediate = false) {
  let timer: any = null
  return function () {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    if (timer) {
      // 清除计时器，并不是将 timer 置为 null
      clearTimeout(timer)
    }
    if (immediate) {
      !timer && fn.apply(that, args)
      timer = setTimeout(function () {
        timer = null
      }, delay)
    } else {
      timer = setTimeout(function () {
        fn.apply(that, args)
      }, delay)
    }
  }
}

export function throttle(fn: Function, delay: number, immediate = false) {
  let timer: any = null
  return function () {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    if (!timer) {
      if (immediate) {
        fn.apply(that, args)
        timer = setTimeout(function () {
          timer = null
        }, delay)
      } else {
        timer = setTimeout(function () {
          timer = null
          fn.apply(that, args)
        }, delay)
      }
    }
  }
}

/**
 * 并发控制
 * https://github.com/SunshowerC/blog/issues/2
 * @param list 要迭代的数组
 * @param limit 并发数量控制数
 * @param asyncHandle 对 list 的每一项的处理函数，参数为当前处理项，必需 return 一个Promise来确定 是否继续进行迭代
 * @return {Promise} 返回一个 Promise 值来确认所有数据是否迭代完成
 */
export async function mapLimit(list: any[], limit: number, asyncHandle: Function) {
  // 对list进行浅拷贝，防止list被修改
  const listCopy: any[] = [...list]
  const asyncResult: any = [] // 并发结果
  const asyncList: Promise<any>[] = [] // 正在进行的所有并发异步操作

  const run = (arr: any[]) => {
    return asyncHandle(arr.shift()).then((res: any) => {
      asyncResult.push(res)
      if (arr.length) {
        return run(arr)
      } else {
        return asyncResult
      }
    })
  }

  while (limit--) {
    // 同时进行的并发
    asyncList.push(run(listCopy))
  }
  return Promise.all(asyncList)
  // return new Promise((resolve, reject) => {
  //   // 对list进行浅拷贝，防止list被修改
  //   const listCopy: any[] = [...list]
  //   const asyncResult: any = [] // 并发结果

  //   const run = (arr: any[]) => {
  //     asyncHandle(arr.shift()).then((res: any) => {
  //       // console.log('啊啊', res)
  //       asyncResult.push(res)
  //       if (arr.length) {
  //         run(arr)
  //       } else {
  //         resolve(asyncResult)
  //       }
  //     })
  //     // .catch((err: any) => {
  //     //   console.log('并发过程中出错', err)
  //     //   reject(err)
  //     // })
  //     // .finally(() => {
  //     //   if (arr.length) {
  //     //     // console.log('并发继续', arr.length)
  //     //     run(arr)
  //     //   } else {
  //     //     console.log('并发结束', asyncResult)
  //     //     resolve(asyncResult) // 所有并发操作完成后，本次并发控制迭代完成
  //     //   }
  //     // })
  //   }

  //   while (limit--) {
  //     // 同时进行的并发
  //     run(listCopy)
  //   }
  // })
}

export async function testMapLimit() {
  const dataList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 100, 113]
  let count = 0
  return await mapLimit(dataList, 3, (currentItem: number) => {
    return new Promise((resolve, reject) => {
      count++
      setTimeout(() => {
        console.log(currentItem, '当前并发量:', count--)
        if (currentItem !== 1) {
          resolve(currentItem)
        } else {
          // reject(currentItem)
          resolve(currentItem)
        }
      }, Math.random() * 4000)
    })
  })
}

/**
 * 柯里化
 * https://zh.javascript.info/currying-partials
 */
export function curry(func: Function) {
  return function curried(...args: any[]) {
    if (args.length === func.length) {
      return func.apply(this, args)
    } else {
      return function (...args2: any[]) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

// 如果是对象/数组，返回一个空的对象/数组，
// 都不是的话直接返回原对象
// 判断返回的对象和原有对象是否相同就可以知道是否需要继续深拷贝
// 处理其他的数据类型的话就在这里加判断
function getEmpty(o: any) {
  if (Object.prototype.toString.call(o) === '[object Object]') {
    return {}
  }
  if (Object.prototype.toString.call(o) === '[object Array]') {
    return []
  }
  return o
}

// 广度深拷贝
export function deepCopyBFS(origin: any) {
  const queue = []
  const map = new Map() // 记录出现过的对象，用于处理环

  const target = getEmpty(origin)
  if (target !== origin) {
    queue.push([origin, target])
    map.set(origin, target)
  }

  while (queue.length) {
    const [ori, tar] = queue.shift()
    for (const key in ori) {
      // 处理环状
      if (map.get(ori[key])) {
        console.log('出现环引用', tar[key])
        tar[key] = map.get(ori[key])
        continue
      }

      tar[key] = getEmpty(ori[key])
      if (tar[key] !== ori[key]) {
        queue.push([ori[key], tar[key]])
        map.set(ori[key], tar[key])
      }
    }
  }

  return target
}

// 深度深拷贝
export function deepCopyDFS(origin: any) {
  // 递归的方式
  const target = getEmpty(origin)
  if (target !== origin) {
    for (const key in origin) {
      target[key] = deepCopyDFS(origin[key])
    }
  }
  return target

  // // 不使用递归方式
  // const stack = []
  // const map = new Map() // 记录出现过的对象，用于处理环

  // const target = getEmpty(origin)
  // if (target !== origin) {
  //   stack.push([origin, target])
  //   map.set(origin, target)
  // }

  // while (stack.length) {
  //   const [ori, tar] = stack.pop()
  //   for (const key in ori) {
  //     // 处理环
  //     if (map.get(ori[key])) {
  //       tar[key] = map.get(ori[key])
  //       continue
  //     }

  //     tar[key] = getEmpty(ori[key])
  //     if (tar[key] !== ori[key]) {
  //       stack.push([ori[key], tar[key]])
  //       map.set(ori[key], tar[key])
  //     }
  //   }
  // }
  // return target
}

export function TestProxy(obj: any) {
  const newObj = new Proxy(obj, {
    get: function (target, key, receiver) {
      console.log(`getting ${target},\n ${String(key)}`)
      return Reflect.get(target, key, receiver)
    },
    set: function (target, key, value, receiver) {
      console.log(`setting ${target}, ${String(key)}, ${value}, ${receiver}`)
      return Reflect.set(target, key, value, receiver)
    },
  })

  return newObj
}
