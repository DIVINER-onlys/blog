import EbanxTemplate from './template/default/template'
import {PublicKey, InitialData, FieldParams, JSONObject} from '../../index.d'
import ChannelBaseClass from '../ChannelBaseClass'
import loadjs from 'loadjs'
import {checkEbanxUserName, checkoutCardNumber, checkEbanxExpiration, checkCVV} from '../../util'
import styleObject from './styleObject'

class Ebanx extends ChannelBaseClass {
  private publicKey: PublicKey
  private initialData: InitialData

  private userNameErrorTips: string
  private cardNumberErrorTips: string
  private expirationErrorTips: string
  private cvvErrorTips: string

  private userName: string
  private cardNumber: string
  private expiration: string
  private cvv: string

  constructor(publicKey: PublicKey, initialData: InitialData) {
    super()
    this.publicKey = publicKey
    this.initialData = initialData
    this.userNameErrorTips = ''
    this.cardNumberErrorTips = ''
    this.expirationErrorTips = ''
    this.cvvErrorTips = ''
    this.userName = ''
    this.cardNumber = ''
    this.expiration = ''
    this.cvv = ''
    this.loadEBANXJS() // 加载第三方SDK
    this.renderHtml() // 渲染表单
  }

  private loadEBANXJS() {
    // sdk 加载数据上报
    const lasttime = new Date().getTime()
    loadjs(
      [
        `https://js.ebanx.com/assets/songbird/songbird-${this.initialData?.env ?? 'dev'}.js`,
        'https://js.ebanx.com/ebanx-libjs-latest.min.js',
      ],
      () => {
        console.log('success', EBANX)
        EBANX.config.setMode(this.initialData?.env === 'prod' ? 'production' : 'test')
        EBANX.config.setPublishableKey(this.publicKey.key)
        EBANX.config.setCountry(this.initialData?.country || 'br')

        const time = new Date().getTime() - lasttime
        this.initialData?.reportSDKLoading?.({time})
      }
    )
  }

  private renderHtml() {
    const styleOption: JSONObject = styleObject(this.initialData?.styleOption)
    // this.renderToDom(
    //   EbanxTemplate({
    //     submit: this.submit.bind(this),
    //     changeUserName: this.changeUserName.bind(this),
    //     changeCardNumber: this.changeCardNumber.bind(this),
    //     changeExpiration: this.changeExpiration.bind(this),
    //     changeCVV: this.changeCVV.bind(this),
    //     label: this.initialData?.label,
    //     placeholder: this.initialData?.placeholder,
    //     btnText: this.initialData?.btnText,
    //     styleOption,
    //     userName: this.initialData?.fieldData?.userName,
    //   }),
    //   this.initialData.domId
    // )
  }

  // 表单修改回调
  private fieldOnChange(fieldParams: FieldParams, fieldType: 'onkeyup' | 'onblur') {
    if (!fieldParams.message) {
      if (this.userNameErrorTips && !this.initialData?.fieldData?.userName) {
        fieldParams.message = this.userNameErrorTips
        fieldParams.param = 'username'
      }
      if (this.cardNumberErrorTips) {
        fieldParams.message = this.cardNumberErrorTips
        fieldParams.param = 'cardnumber'
      }
      if (this.expirationErrorTips) {
        fieldParams.message = this.expirationErrorTips
        fieldParams.param = 'expiration'
      }
      if (this.cvvErrorTips) {
        fieldParams.message = this.cvvErrorTips
        fieldParams.param = 'cvv'
      }
    }
    if (fieldType === 'onblur' || !fieldParams.message) {
      document.getElementById('ebanx_error_tips').innerText = fieldParams.message
    }
    fieldType === 'onblur' && this.initialData?.fieldOnBlur?.(fieldParams)
    fieldType === 'onkeyup' && this.initialData?.fieldOnChange?.(fieldParams)

    this.fieldComplete()
  }

  // 是否完成表单填写
  private fieldComplete() {
    const EbanxSubmitBtn = document.getElementById('ebanx_submit_btn')
    if (
      (this.initialData?.fieldData?.userName || (!this.userNameErrorTips && this.userName)) &&
      !this.cardNumberErrorTips &&
      !this.expirationErrorTips &&
      !this.cvvErrorTips &&
      this.cardNumber &&
      this.expiration &&
      this.cvv
    ) {
      console.log('表单填写完成')
      EbanxSubmitBtn.removeAttribute('disabled')
      EbanxSubmitBtn.style.background =
        this.initialData?.styleOption?.componentStyle?.btnStyle?.normalBackground || '#ffc102'

      this.initialData?.fieldComplete?.({
        userName: this.userName,
        cardNumber: this.cardNumber,
        expiration: this.expiration,
        cvv: this.cvv,
      })
    } else {
      console.log('表单没填写完成')
      EbanxSubmitBtn.setAttribute('disabled', 'disabled')
      EbanxSubmitBtn.style.background =
        this.initialData?.styleOption?.componentStyle?.btnStyle?.disableBackground || '#dddddd'
    }
  }

  private changeUserName(e: Event, fieldType: 'onkeyup' | 'onblur') {
    this.userName = (<HTMLInputElement>e.target).value
    if (!checkEbanxUserName(this.userName)) {
      this.userNameErrorTips = this.initialData?.errorTips?.userNameErrorTips || 'The username is incorrect.'
    } else {
      this.userNameErrorTips = ''
    }
    this.fieldOnChange(
      {
        message: this.userNameErrorTips,
        param: 'username',
      },
      fieldType
    )
  }

  private async changeCardNumber(e: Event, fieldType: 'onkeyup' | 'onblur', length?: number) {
    this.cardNumber = (<HTMLInputElement>e.target).value
    if (length && this.cardNumber.length !== length) {
      return
    }
    if (!checkoutCardNumber(this.cardNumber)) {
      this.cardNumberErrorTips = this.initialData?.errorTips?.cardNumberErrorTips || 'The card number is incorrect.'
    } else {
      this.cardNumberErrorTips = ''
    }
    // const res: {
    //   isEffect: boolean
    //   binLookUpResponse?: BinLookUpResponse
    // } = await checkoutCardNumber(this.cardNumber)
    // const EbanxCardNameBasicAddon = document.getElementById('ebanx_card_name_basic_addon')
    // if (!res.isEffect) {
    //   this.cardNumberErrorTips = this.initialData?.errorTips?.cardNumberErrorTips || 'The card number is incorrect.'
    //   EbanxCardNameBasicAddon.innerText = 'err'
    // } else {
    //   this.cardNumberErrorTips = ''
    //   EbanxCardNameBasicAddon.innerText = res?.binLookUpResponse?.scheme
    // }
    this.fieldOnChange(
      {
        message: this.cardNumberErrorTips,
        param: 'cardnumber',
      },
      fieldType
    )
  }

  private changeExpiration(e: Event, fieldType: 'onkeyup' | 'onblur') {
    this.expiration = (<HTMLInputElement>e.target).value
    if (!checkEbanxExpiration(this.expiration)) {
      this.expirationErrorTips =
        this.initialData?.errorTips?.expirationErrorTips || 'The card’s expiration date is incorrect.'
    } else {
      this.expirationErrorTips = ''
    }
    this.fieldOnChange(
      {
        message: this.expirationErrorTips,
        param: 'expiration',
      },
      fieldType
    )
  }

  private changeCVV(e: Event, fieldType: 'onkeyup' | 'onblur') {
    this.cvv = (<HTMLInputElement>e.target).value
    if (!checkCVV(this.cvv)) {
      this.cvvErrorTips = this.initialData?.errorTips?.cvvErrorTips || 'The card’s security code is incorrect.'
    } else {
      this.cvvErrorTips = ''
    }
    this.fieldOnChange(
      {
        message: this.cvvErrorTips,
        param: 'cvv',
      },
      fieldType
    )
  }

  private submit(e?: Event) {
    const EbanxSubmitBtn = document.getElementById('ebanx_submit_btn')
    EbanxSubmitBtn.setAttribute('disabled', 'disabled')
    EBANX.card.createToken(
      {
        card_number: (<HTMLInputElement>document.getElementById('ebanx_card_number'))?.value?.replace(/\D/g, ''),
        // card_name: (<HTMLInputElement>document.getElementById('ebanx_user_name')).value,
        card_name:
          this.initialData?.fieldData?.userName || (<HTMLInputElement>document.getElementById('ebanx_user_name')).value,
        card_due_date: (<HTMLInputElement>document.getElementById('ebanx_card_due_date')).value,
        card_cvv: (<HTMLInputElement>document.getElementById('ebanx_card_cvv')).value,
      },
      ebanxResponse => {
        EbanxSubmitBtn.removeAttribute('disabled')
        if (ebanxResponse?.data?.hasOwnProperty('status')) {
          // document.getElementById('status').textContent = 'Success, the token is: ' + ebanxResponse.data.token
        } else {
          const errorMessage = ebanxResponse?.error?.err?.status_message || ebanxResponse?.error?.err?.message || ''
          document.getElementById('ebanx_error_tips').textContent = errorMessage
        }
        this.initialData?.createToken?.(ebanxResponse)
      }
    )
  }

  public async getToken(): Promise<any> {
    console.log('getToken')
    return new Promise((resolve, reject) => {
      EBANX.card.createToken(
        {
          card_number: (<HTMLInputElement>document.getElementById('ebanx_card_number')).value,
          // card_name: (<HTMLInputElement>document.getElementById('ebanx_user_name')).value,
          card_name:
            this.initialData?.fieldData?.userName ||
            (<HTMLInputElement>document.getElementById('ebanx_user_name')).value,
          card_due_date: (<HTMLInputElement>document.getElementById('ebanx_card_due_date')).value,
          card_cvv: (<HTMLInputElement>document.getElementById('ebanx_card_cvv')).value,
        },
        ebanxResponse => {
          if (ebanxResponse?.data?.hasOwnProperty('status')) {
            resolve(ebanxResponse)
          } else {
            const errorMessage = ebanxResponse?.error?.err?.status_message || ebanxResponse?.error?.err?.message || ''
            document.getElementById('ebanx_error_tips').textContent = errorMessage
            reject(ebanxResponse)
          }
        }
      )
    })
  }
}

export default Ebanx
