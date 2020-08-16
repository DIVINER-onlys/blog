import {PublicKey, InitialData, SDK} from '@/index.d'
// import TwoCheckOut from '@/channel/twoCheckout/twoCheckout'
import Ebanx from '@/channel/ebanx/ebanx'

class PAYSDK {
  // 全局 SDK 对象
  private sdk!: SDK
  private publicKey: PublicKey
  private initialData: InitialData

  constructor(publicKey: PublicKey, initialData: InitialData) {
    this.publicKey = publicKey
    this.initialData = initialData
    this.initSDK()
  }

  public checkKey(publicKey: PublicKey): boolean {
    console.log(publicKey)
    return true
  }

  /**
   * getToken
   * 暴露获取 token 的方法
   */
  public async getToken(holderName: string): Promise<any> {
    const token = await this.sdk.getToken(holderName)
    return token
  }

  private async initSDK() {
    if (!this.checkKey(this.publicKey)) {
      //todo: 返回初始失败提示
      return
    }
    // 根据sdk名称初始化不同的sdk
    switch (this.initialData.sdkName) {
      // case '2checkout':
      //   // const TwoCheckOut = (await import('@/channel/2checkout/2checkout')).default
      //   // const TwoCheckOut = require(/* webpackChunkName: "group-foo" */ '@/channel/2checkout/2checkout')
      //   this.sdk = new TwoCheckOut(this.publicKey, this.initialData)
      //   break
      case 'ebanx':
        // const Ebanx = (await import('@/channel/ebanx/ebanx')).default
        // const Ebanx = require(/* webpackChunkName: "group-foo" */ '@/channel/ebanx/ebanx')
        this.sdk = new Ebanx(this.publicKey, this.initialData)
        break
    }
  }
}

export default PAYSDK
// export {TwoCheckOut, Ebanx}
export {Ebanx}
// export * from '@/index.d'
