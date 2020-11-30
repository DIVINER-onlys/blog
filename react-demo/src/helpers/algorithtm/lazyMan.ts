class LazyManClass {
  name: any = ''
  queue: any[] = []

  constructor(name: any) {
    this.name = name
    this.queue = []
    console.log(`Hi I am ${name}`)
    setTimeout(() => {
      this.next()
    }, 0)
  }

  sleepFirst(time: number) {
    const fn = () => {
      new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, time * 1000)
      }).then(_ => {
        console.log(`优先等待， 等待了${time}秒...`)
        this.next()
      })
    }
    this.queue.unshift(fn)
    return this
  }

  sleep(time: number) {
    const fn = () => {
      new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, time * 1000)
      }).then(_ => {
        console.log(`等待了${time}秒`)
        this.next()
      })
    }
    this.queue.push(fn)
    return this
  }

  eat(food: any) {
    const fn = () => {
      console.log(`I am eating ${food}`)
      this.next()
    }
    this.queue.push(fn)
    return this
  }

  next() {
    // console.log('进来了', this.queue)
    const fn = this.queue.shift()
    fn && fn()
  }
}

export function LazyMan(name: any) {
  return new LazyManClass(name)
}
