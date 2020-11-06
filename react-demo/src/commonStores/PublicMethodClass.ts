import {useEffect, useRef, useState} from 'react'
import _ from 'lodash'


type watchStackT = {
  name: string | string[]
  setState: React.Dispatch<any>
  state: any
}

type responseStackT = {
  name: string | string[]
  setState: React.Dispatch<any>
}

export default class PublicMethodClass {
  private watchStacks: watchStackT[] = []
  private responseStacks: responseStackT[] = []
  private stackImmediate: any
  
  public useWatch<T = any>(dataName: string | string[]): T {
    const isFirstRender = useRef(true)
    let data: T = '' as any
    if (isFirstRender.current) {
      if (typeof dataName == 'string') data = _.get(this, dataName) as T
      else {
        data = (dataName.map(name => _.get(this, name)) as any) as T
      }
    }
    const [state, setState] = useState<T>(data)
    useEffect(() => {
      // 组件销毁时移除
      return () => {
        this.unWatch(setState)
      }
    }, [])
    if (isFirstRender.current) {
      const stack: watchStackT = {
        name: dataName,
        setState,
        state: data,
      }
      this.watchStacks.push(stack)
      isFirstRender.current = false
    }
    // console.warn('this.watchStacks.length', this.watchStacks.length)
    // console.warn('this.watchStacks', this.watchStacks)
    return state
  }

  private async responseState(): Promise<any> {
    const {length} = this.responseStacks
    await Promise.resolve()
    if (length < this.responseStacks.length) return
    this.responseStacks.forEach(stack => {
      if (typeof stack.name == 'string') stack.setState(_.get(this, stack.name))
      else {
        const newState: any[] = []
        stack.name.forEach(name => {
          newState.push(_.get(this, name))
        })
        stack.setState(newState)
      }
    })
    this.responseStacks = []
    return
  }

  protected responseWatch(name: string, newObj: any) {
    console.warn('_.get(this, stack.name)', _.get(this, name), this, name)
    this.watchStacks.forEach(stack => {
      if (this.responseStacks.some(responseStack => responseStack.setState == stack.setState)) return
      if (typeof stack.name == 'string') {
        if (stack.name === name) {
          this.responseStacks.push({name: stack.name, setState: stack.setState})
          this.responseState()
          // window.clearImmediate(this.stackImmediate)
          // this.stackImmediate = window.setImmediate(this.responseState.bind(this))
        }
      } else {
        if (stack.name.join(',').indexOf(name) > -1) {
          this.responseStacks.push({name: stack.name, setState: stack.setState})
          this.responseState()
          // window.clearImmediate(this.stackImmediate)
          // this.stackImmediate = window.setImmediate(this.responseState.bind(this))
        }
      }
    })
  }
  
  public unWatch(setState: React.Dispatch<React.SetStateAction<any>>) {
    this.watchStacks = this.watchStacks.filter(stack => stack.setState != setState)
  }
}

export const responseWatch = (name: string) => {
  return function (
    target: Record<string, any>,
    propertyName: string,
    propertyDescriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const method = propertyDescriptor.value
    propertyDescriptor.value = function (data: any) {
      // console.warn('decorator output', this.responseWatch, data, name)
      this.responseWatch(name, data)
      return method.call(this, data)
    }
    return propertyDescriptor
  }
}
