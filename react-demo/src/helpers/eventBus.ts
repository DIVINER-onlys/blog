class EventBus {
  evenFuns: Record<string, Function[]> = {} // 存储事件
  onceFuns: Record<string, Function[]> = {} // 存储单次事件

  // 监听
  on(eventName: string, cb: Function) {
    if (!this.evenFuns[eventName]) {
      this.evenFuns[eventName] = []
    }
    const hasCb = this.evenFuns[eventName].find(func => func === cb)
    if (hasCb) {
      console.log('该事件已存在于监听队列中')
    } else {
      this.evenFuns[eventName].push(cb)
    }

    console.log('当前eventBus的监听事件', this.evenFuns, hasCb)
  }

  // 单次事件监听
  once(eventName: string, cb: Function) {
    if (!this.onceFuns[eventName]) {
      this.onceFuns[eventName] = []
    }
    const localFunc = async (params: any) => {
      cb && cb(params)
      const index = this.onceFuns[eventName]?.indexOf(localFunc) ?? -1
      // console.log('一次性监听调用后删除 ', index, localFunc)
      if (index !== -1) {
        // 调用后删除
        this.onceFuns[eventName].splice(index, 1)
        console.log('一次性监听调用后删除', this.onceFuns)
      }
    }
    this.onceFuns[eventName].push(localFunc)
    console.log('当前eventBus监听的一次性事件', this.onceFuns)
  }

  // 移除监听
  off(eventName: string, cb?: Function) {
    // 移除某个监听
    if (cb) {
      const indexEvent = this.evenFuns[eventName]?.indexOf(cb) ?? -1
      // const indexOnce = this.onceFuns[eventName]?.indexOf(cb) ?? -1

      // 移除指定监听
      if (indexEvent !== -1) {
        this.evenFuns[eventName]?.splice(indexEvent, 1)
      }
      // if (indexOnce !== -1) {
      //   this.onceFuns[eventName]?.splice(indexOnce, 1)
      // }
    } else {
      // 没传默认移除所有监听
      this.evenFuns[eventName] = []
      // this.onceFuns[eventName] = []
    }

    // console.log('移除eventBus事件后', this.evenFuns, this.onceFuns)
    console.log('移除eventBus事件后', this.evenFuns)
  }

  // 派发事件
  emit(eventName: string, params?: any) {
    const eventFunList = this.evenFuns[eventName] ?? []
    const onceFunList = this.onceFuns[eventName] ?? []

    eventFunList.forEach((func: Function) => {
      func && func(params)
    })
    onceFunList.forEach(async (func: Function) => {
      await Promise.resolve()
      func && func(params)
    })

    console.log('执行后evenFuns事件', this.evenFuns)
    console.log('执行后onceFuns事件', this.onceFuns)
  }
}

export default new EventBus()
