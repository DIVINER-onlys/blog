
export type EventBusFunc = Record<string, Function[]>

class EventBus {
  private eventFuns: EventBusFunc = {}
  private onceFuns: EventBusFunc = {}

  constructor() {}

  // 监听
  on(eventName: string, cb: Function) {
    if(!this.eventFuns[eventName]) {
      this.eventFuns[eventName] = []
    }
    this.eventFuns[eventName].push(cb)
  }

  // 派发事件
  emit(eventName: string, params?: any) {
    const onceFunList = this.onceFuns[eventName] ?? []
    const eventFunList = this.eventFuns[eventName] ?? []

    eventFunList.forEach((func: Function) =>{
      func && func(params)
    })
    console.log(this)
  }
}

export default new EventBus()

const eventBus = new EventBus()


eventBus.on('ss', (t) => {
  console.log('啊啊', this, t) 
})
eventBus.emit('ss', '林浩然')
console.log('sssss', this)
// const emit = eventBus.emit
// emit.call(this, 'ss')
// eventBus.