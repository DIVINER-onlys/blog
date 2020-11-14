const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class MyPromise {
  status: string
  value: any
  reason: any
  onResolvedCallbacks: Function[] // 存放成功的回调函数
  onRejectedCallbacks: Function[] // 存放失败的回调函数

  constructor(executor: Function) {
    this.status = PENDING // 宏变量，默认是等待态
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value: any) => {
      if (this.status === PENDING) {
        // 只有状态是等待态才能更改状态
        this.value = value
        this.status = RESOLVED
        // 需要让成功的方法依次执行
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    const reject = (reason: any) => {
      if (this.status === PENDING) {
        this.reason = reason
        this.status = REJECTED
        // 需要让失败的方法依次执行
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }

    // 执行executor传入我们定义的成功和失败函数，把内部的resolve和reject传入executor中用户写的resolve，reject
    try {
      executor(resolve, reject)
    } catch (err) {
      console.log('catch错误', err)
      reject(err) // 内部出错，直接将error手动调用reject向下传递
    }
  }

  then(onfulfilled: any, onrejected: any) {
    if (this.status === RESOLVED) {
      onfulfilled(this.value)
    }
    if (this.status === REJECTED) {
      onrejected(this.reason)
    }
    // 处理异步的情况
    if (this.status === PENDING) {
      this.onResolvedCallbacks.push(() => {
        onfulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onrejected(this.reason)
      })
    }
  }
}

export default MyPromise
