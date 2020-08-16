import sdk from '../../../dist/index'
// import sdk from 'webpack_ts_es'

const publicKey = {
  //   key: '250405304072',
  // key: 'AVLRNG',
  key: 'test_pk_jzJwjuWU2x-i1bgbPr2w_g',
}

const initialData = {
  env: 'dev',
  domId: '',
  // sdkName: '2checkout',
  sdkName: 'ebanx',
  // nameInputTitle: '姓名',
  btnText: '提交',
  fieldData: {
    userName: 'José Silva',
  },
  callback: token => {
    console.log(token)
  },
  fieldOnChange: fieldValidtion => {
    console.log('改变', fieldValidtion)
  },
  fieldOnBlur: fieldValidtion => {
    console.log('失焦', fieldValidtion)
  },
  createToken: response => {
    console.log('token回调', response)
  },
  fieldComplete: fieldCompleteParams => {
    console.log('表单填写完成', fieldCompleteParams)
  },
  styleOption: {
    commonStyle: {},
    componentStyle: {
      formStyle: {
        padding: '20px',
      },
      nameInputStyle: {},
      cardInputStyle: {
        labelStyle: {
          // backgroundColor: 'red',
        },
      },
      expirationInputStyle: {},
      cvvInputStyle: {},
      btnStyle: {},
    },
  },
  label: {
    userNameLabel: 'User Name',
    cardNumberLabel: 'Card Number',
    expirationLabel: 'Card Due Date',
    cvvLabel: 'Card Cvv',
  },

  /**
   * 2checkout 语言码，需写进 SDK 文档（非规范国家码）
   * https://knowledgecenter.2checkout.com/Documentation/07Commerce/Checkout-links-and-options/2Checkout-supported-languages
   */
  language: 'zh',
}

console.log('啊啊啊', sdk)
const pay = new sdk(publicKey, initialData)

// setTimeout(async () => {
//   const res = await pay.getToken()
//   console.log('啊啊啊', res)
// }, 1000)

const holderName = '持卡人姓名'
// setTimeout(async () => {
//   const token = await pay.getToken(holderName)
//   console.log(token)
// }, 15000)
