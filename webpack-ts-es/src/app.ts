import {PublicKey, InitialData, SDK} from './index.d'

class PAYSDK {
  // 全局 SDK 对象
  // private sdk!: SDK
  private publicKey: PublicKey
  private initialData: InitialData

  constructor(publicKey: PublicKey, initialData: InitialData) {
    this.publicKey = publicKey
    this.initialData = initialData

    console.log('')
  }
  t = (): void => {}
}

export default PAYSDK
