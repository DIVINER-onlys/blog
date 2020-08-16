import {StyleOption, JSONObject} from '@/index'

const styleObject = (styleOption?: StyleOption): JSONObject => {
  const commonStyle = styleOption?.commonStyle
  const componentStyle = styleOption?.componentStyle

  const formStyle = componentStyle?.formStyle
  const nameInputStyle = componentStyle?.nameInputStyle
  const cardInputStyle = componentStyle?.cardInputStyle
  const expirationInputStyle = componentStyle?.expirationInputStyle
  const cvvInputStyle = componentStyle?.cvvInputStyle
  const btnStyle = componentStyle?.btnStyle

  const style = {
    // formStyle
    ebanx_payment_form: {
      // background: 'red',
      width: '100%',
      ...(formStyle || {}),
    },

    // nameInputStyle
    ebanx_nameInputStyle_inputWrapperStyle: {
      width: '100%',
      margin: '10px 0',
      ...(nameInputStyle?.inputWrapperStyle || {}),
    },
    ebanx_nameInputStyle_labelStyle: {
      display: 'block',
      fontWeight: 400,
      fontSize: '15px',
      marginBottom: '8px',
      ...(nameInputStyle?.labelStyle || {}),
    },
    ebanx_nameInputStyle_inputStyle: {
      width: '100%',
      padding: '18px 15px',
      borderRadius: '6px',
      color: '#000000',
      background: '#F3F3F3',
      border: '0px',
      fontSize: '16px',
      outline: 'none',
      ...(nameInputStyle?.inputStyle || {}),
    },
    ebanx_nameInputStyle_messageStyle: {},

    // cardInputStyle
    ebanx_cardInputStyle_inputWrapperStyle: {
      width: '100%',
      margin: '10px 0',
      ...(cardInputStyle?.inputWrapperStyle || {}),
    },
    ebanx_cardInputStyle_labelStyle: {
      display: 'block',
      fontWeight: 400,
      fontSize: '15px',
      marginBottom: '8px',
      ...(cardInputStyle?.labelStyle || {}),
    },
    ebanx_cardInputStyle_inputStyle: {
      width: '100%',
      padding: '18px 15px',
      borderRadius: '6px',
      color: '#000000',
      background: '#F3F3F3',
      border: '0px',
      fontSize: '16px',
      outline: 'none',
      ...(cardInputStyle?.inputStyle || {}),
    },
    ebanx_cardInputStyle_messageStyle: {},

    // flexStyle
    ebanx_flex_style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      // background: 'pink',
    },

    // expirationInputStyle
    ebanx_expirationInputStyle_inputWrapperStyle: {
      width: '48%',
      margin: '10px 0',
      ...(expirationInputStyle?.inputWrapperStyle || {}),
    },
    ebanx_expirationInputStyle_labelStyle: {
      display: 'block',
      fontWeight: 400,
      fontSize: '15px',
      marginBottom: '8px',
      ...(expirationInputStyle?.labelStyle || {}),
    },
    ebanx_expirationInputStyle_inputStyle: {
      width: '100%',
      padding: '18px 15px',
      borderRadius: '6px',
      color: '#000000',
      background: '#F3F3F3',
      border: '0px',
      fontSize: '16px',
      outline: 'none',
      ...(expirationInputStyle?.inputStyle || {}),
    },
    ebanx_expirationInputStyle_messageStyle: {},

    // cvvInputStyle
    ebanx_cvvInputStyle_inputWrapperStyle: {
      width: '48%',
      margin: '10px 0',
      ...(cvvInputStyle?.inputWrapperStyle || {}),
    },
    ebanx_cvvInputStyle_labelStyle: {
      display: 'block',
      fontWeight: 400,
      fontSize: '15px',
      marginBottom: '8px',
      ...(cvvInputStyle?.labelStyle || {}),
    },
    ebanx_cvvInputStyle_inputStyle: {
      width: '100%',
      padding: '18px 15px',
      borderRadius: '6px',
      color: '#000000',
      background: '#F3F3F3',
      border: '0px',
      fontSize: '16px',
      outline: 'none',
      ...(cvvInputStyle?.inputStyle || {}),
    },
    ebanx_cvvInputStyle_messageStyle: {},

    ebanx_error_tips: {
      marginTop: '-10px',
      lineHeight: '18px',
      minHeight: '20px',
      // background: 'pink',
      color: 'red',
      ...(nameInputStyle?.messageStyle || {}),
      ...(cardInputStyle?.messageStyle || {}),
      ...(expirationInputStyle?.messageStyle || {}),
      ...(cvvInputStyle?.messageStyle || {}),
    },

    // btn
    ebanx_submit_btn: {
      width: '100%',
      color: '#ffffff',
      padding: '15px',
      fontSize: '16px',
      opacity: 1,
      background: btnStyle?.disableBackground || btnStyle?.background || '#dddddd',
      outline: 'none',
      border: '0px',
      borderRadius: '6px',
      ...btnStyle,
    },
  }
  return style
}
export default styleObject
