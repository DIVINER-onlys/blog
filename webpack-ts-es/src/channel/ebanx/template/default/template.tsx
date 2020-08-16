import {Label, Placeholder, JSONObject} from '../../../../index.d'

interface Props {
  submit: (e: Event) => void
  changeUserName: (e: Event, fieldType: 'onkeyup' | 'onblur') => void
  changeCardNumber: (e: Event, fieldType: 'onkeyup' | 'onblur', length?: number) => void
  changeExpiration: (e: Event, fieldType: 'onkeyup' | 'onblur') => void
  changeCVV: (e: Event, fieldType: 'onkeyup' | 'onblur') => void
  label: Label
  placeholder: Placeholder
  btnText: string
  styleOption: JSONObject
  userName: string
}

const template = (props: Props): Element => (
  <div className="ebanx_cover">
    <div
      dangerouslySetInnerHTML={{
        __html: `<style>
        .ebanx_cover * {
          box-sizing: border-box !important;
          margin: 0;
          padding: 0;
        }
        .ebanx_cover input::placeholder{
          color: #999999 !important;
        }
        </style>`,
      }}
    ></div>
    <div className="ebanx_payment_form" style={props.styleOption['ebanx_payment_form']}>
      {!props.userName && (
        <div
          calssName="ebanx_nameInputStyle_inputWrapperStyle"
          style={props.styleOption['ebanx_nameInputStyle_inputWrapperStyle']}
        >
          {props?.label?.userNameLabel && (
            <label
              for="ebanx_user_name"
              className="ebanx_nameInputStyle_labelStyle"
              style={props.styleOption?.['ebanx_nameInputStyle_labelStyle']}
            >
              {props?.label?.userNameLabel ?? 'User Name'}
            </label>
          )}
          <input
            placeholder={`${props?.placeholder?.userNamePlaceholder ?? 'User Name'}`}
            type="text"
            id="ebanx_user_name"
            className="ebanx_nameInputStyle_inputStyle"
            style={props.styleOption?.['ebanx_nameInputStyle_inputStyle']}
            onkeyup={(e: Event) => {
              props.changeUserName(e, 'onkeyup')
            }}
            onblur={(e: Event) => {
              props.changeUserName(e, 'onblur')
            }}
          />
        </div>
      )}

      <div
        className="ebanx_cardInputStyle_inputWrapperStyle"
        style={props.styleOption['ebanx_cardInputStyle_inputWrapperStyle']}
      >
        {props?.label?.cardNumberLabel && (
          <label
            for="ebanx_card_number"
            className="ebanx_cardInputStyle_labelStyle"
            style={props.styleOption?.['ebanx_cardInputStyle_labelStyle']}
          >
            {props?.label?.cardNumberLabel ?? 'Card Number'}
          </label>
        )}
        <div>
          {/* <div class="input-group-prepend">
                <span class="input-group-text" id="ebanx_card_name_basic_addon"></span>
              </div> */}
          <input
            placeholder={`${props?.placeholder?.cardNumberPlaceholder ?? 'Card Number'}`}
            type="text"
            maxlength="23"
            id="ebanx_card_number"
            className="ebanx_cardInputStyle_inputStyle"
            style={props.styleOption?.['ebanx_cardInputStyle_inputStyle']}
            oninput={(e: Event) => {
              ;(e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value
                ?.replace(/\D/g, '')
                ?.replace(/(\d{4})/g, '$1 ')
                ?.trim()
                ?.slice(0, 23)
            }}
            onkeyup={(e: Event) => {
              ;(e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value
                ?.replace(/\D/g, '')
                ?.replace(/(\d{4})/g, '$1 ')
                ?.trim()
                ?.slice(0, 23)
              props.changeCardNumber(e, 'onkeyup')
            }}
            onblur={(e: Event) => {
              props.changeCardNumber(e, 'onblur')
            }}
          />
        </div>
      </div>

      <div className="ebanx_flex_style" style={props.styleOption['ebanx_flex_style']}>
        <div
          className="ebanx_expirationInputStyle_inputWrapperStyle"
          style={props.styleOption['ebanx_expirationInputStyle_inputWrapperStyle']}
        >
          {props?.label?.expirationLabel && (
            <label
              for="ebanx_card_due_date"
              className="ebanx_expirationInputStyle_labelStyle"
              style={props.styleOption?.['ebanx_expirationInputStyle_labelStyle']}
            >
              {props?.label?.expirationLabel ?? 'Card Due Date'}
            </label>
          )}
          <input
            placeholder={`${props?.placeholder?.expiryMonthPlaceholder ?? 'MM'}/${
              props?.placeholder?.expiryYearPlaceholder ?? 'YYYY'
            }`}
            type="text"
            id="ebanx_card_due_date"
            className="ebanx_expirationInputStyle_inputStyle"
            style={props.styleOption?.['ebanx_expirationInputStyle_inputStyle']}
            // onChange={(e: Event) => {
            //   console.log('onChange', e.target.value)
            // }}
            // oninput={(e: Event) => {
            //   // e.target.value = e.target.value + '/'
            //   console.log('oninput', e.target.value)
            // }}
            // onpropertychange={(e: Event) => {
            //   console.log('onpropertychange', e.target.value)
            // }}
            onblur={(e: Event) => {
              props.changeExpiration(e, 'onblur')
            }}
            // onfocus={(e: Event) => {
            //   console.log('onfocus', e.target.value)
            // }}
            onkeyup={(e: Event) => {
              ;(e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value
                ?.replace(/\D/g, '')
                ?.slice(0, 6)
                ?.replace(/^(\d{2})\/?(\d{0,})$/, ($1, $2, $3) => `${$2}${$3 ? '/' + $3 : $3}`)
              props.changeExpiration(e, 'onkeyup')
            }}
          />
        </div>

        <div
          className="ebanx_cvvInputStyle_inputWrapperStyle"
          style={props.styleOption['ebanx_cvvInputStyle_inputWrapperStyle']}
        >
          {props?.label?.cvvLabel && (
            <label
              for="ebanx_card_cvv"
              className="ebanx_cvvInputStyle_labelStyle"
              style={props.styleOption?.['ebanx_cvvInputStyle_labelStyle']}
            >
              {props?.label?.cvvLabel ?? 'Card Cvv'}
            </label>
          )}
          <input
            placeholder={`${props?.placeholder?.cvvPlaceholder ?? 'Cvv'}`}
            type="text"
            maxlength="4"
            id="ebanx_card_cvv"
            className="ebanx_cvvInputStyle_inputStyle"
            style={props.styleOption?.['ebanx_cvvInputStyle_inputStyle']}
            oninput={(e: Event) => {
              ;(e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value
                ?.replace(/\D/g, '')
                ?.slice(0, 4)
            }}
            onkeyup={(e: Event) => {
              ;(e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value
                ?.replace(/\D/g, '')
                ?.slice(0, 4)
              props.changeCVV(e, 'onkeyup')
            }}
            onblur={(e: Event) => {
              props.changeCVV(e, 'onblur')
            }}
          />
        </div>
      </div>

      <div id="ebanx_error_tips" className="ebanx_error_tips" style={props.styleOption['ebanx_error_tips']}></div>
      {props?.btnText && (
        <button
          type="submit"
          id="ebanx_submit_btn"
          className="ebanx_submit_btn"
          style={props.styleOption?.['ebanx_submit_btn']}
          disabled
          onClick={(e: MouseEvent) => {
            props?.submit(e)
          }}
        >
          {props?.btnText ?? 'OK'}
        </button>
      )}
    </div>
  </div>
)

export default template
