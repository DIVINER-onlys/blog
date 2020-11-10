class EventBus {
  evenFuns: Record<string, Function[]> = {} // 存储事件
  onceFuns: Record<string, Function[]> = {} // 存储单次事件

  // 监听
  on(eventName: string, cb: Function) {
    if (this.evenFuns[eventName]) {
      this.evenFuns[eventName] = []
    }
    this.evenFuns[eventName].push(cb)
    console.log(this.evenFuns)
  }
}

export default new EventBus()
