// JSON TYPE
type JSONPrimitive = string | number | boolean | null
type JSONArray = Array<JSONValue>
type JSONValue = JSONPrimitive | JSONObject | JSONArray
type JSONObject = {[member: string]: JSONValue}

export interface SDK {
  getToken: (holderName: string) => Promise<any>
}

export interface PublicKey {
  key: string // 初始化代币
}

export interface InitialData {
  env: 'prod' | 'dev' // 当前环境 用于个别SDK加载脚本环境区分
  sdkName: '2checkout' | 'ebanx' | 'checkout' // sdk名
  domId: string // 需要渲染的dom id
  layoutType?: 0 // 布局类型
  styleOption?: StyleOption
  language?: string // 语言 没传根据sdk按照sdk本身的默认locale
  country?: string // 国家码 没传根据sdk按照sdk本身的默认country
  label?: Label // label提示
  placeholder?: Placeholder // input框提示
  errorTips?: ErrorTips // 表单错误提示
  btnText?: string // 按钮文本
  fieldData?: FieldData // 表单默认数据
  createToken?: (response: any) => void // 点击按钮获取token回调
  fieldOnChange?: (fieldParams: FieldParams) => void // 表单填写无效信息时回调
  fieldOnBlur?: (fieldParams: FieldParams) => void // 表单输入框失焦时回调
  fieldComplete?: (fieldCompleteParams: FieldCompleteParams) => void // 表单填写完成时回调
  reportSDKLoading?: (reportSDKLoadingParams: ReportSDKLoadingParams) => void // SDK脚本加载时间
  // todo 暴露各个表单事件
}

export interface StyleOption {
  commonStyle?: JSONObject
  componentStyle?: ComponentStyle
}

export interface CommonStyle {
  fontFamily: string
  fontSize: string
  fontWeight: string
  color: string
  textAlign: string
  backgroundColor: string
  boxSizing: string
  padding: string
  margin: string
}

export interface ComponentStyle {
  formStyle?: JSONObject
  nameInputStyle?: InputStyle
  cardInputStyle?: InputStyle
  expirationInputStyle?: InputStyle
  cvvInputStyle?: InputStyle
  btnStyle?: {
    normalBackground: string // 正常按钮颜色
    disableBackground: string // 禁用按钮颜色
  } & JSONObject
}

export interface InputStyle {
  labelStyle?: JSONObject
  inputWrapperStyle?: JSONObject
  inputStyle?: JSONObject
  messageStyle?: JSONObject
}

export interface Label {
  userNameLabel?: string
  cardNumberLabel?: string
  expirationLabel?: string
  cvvLabel?: string
}

export interface Placeholder {
  userNamePlaceholder?: string
  cardNumberPlaceholder?: string
  expiryMonthPlaceholder?: string
  expiryYearPlaceholder?: string
  cvvPlaceholder?: string
}

export interface ErrorTips {
  userNameErrorTips?: string
  cardNumberErrorTips?: string
  expirationErrorTips?: string
  cvvErrorTips?: string
}

export interface FieldParams {
  message?: string
  param?: 'username' | 'cardnumber' | 'expiration' | 'cvv'
}

export interface BinLookUpResponse {
  number: JSONObject
  scheme: string
  country: {
    numeric: string
    alpha2: string
    name: string
    emoji: string
    currency: string
    latitude: number
    longitude: number
  }
  bank: {
    name: string
    url: string
    phone: string
  }
}

export interface ReportSDKLoadingParams {
  time?: number
}

export interface FieldCompleteParams {
  userName?: string
  cardNumber?: string
  expiration?: string
  cvv?: string
}

export interface FieldData {
  userName?: string
}

// eslint-disable-next-line prettier/prettier
// declare module "@efox/pay" {
//   export default class PAYSDK {
//     constructor(publicKey: PublicKey, initialData: InitialData)
//     checkKey(publicKey: PublicKey): boolean
//     getToken(holderName: string): Promise<any>
//   }
// }
