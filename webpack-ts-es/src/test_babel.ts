import {resolve} from 'path'
import {rejects} from 'assert'

class TestBabel {
  constructor() {}

  // public fn = (): void => {
  //   console.log('i am a arrow fn')
  // }

  public fn2(): void {
    const findIndex = [1, 2, 3].includes(2)
  }

  public fn3(): void {
    const promise = new Promise((resolve, reject) => {
      resolve('i am a promise')
    })
  }
}

export default TestBabel
