// import lookup from 'binlookup'
// import {BinLookUpResponse} from '../index.d'

export function checkEbanxUserName(userName: string): boolean {
  return /^[\s\S]{2,50}$/.test(userName)
}

// export async function checkoutCardNumber(
//   cardNumber: string,
// ): Promise<{
//   isEffect: boolean
//   binLookUpResponse?: BinLookUpResponse
// }> {
//   try {
//     const binLookUpResponse = await lookup()(cardNumber)
//     console.log('卡号校验通过', binLookUpResponse)
//     return {
//       isEffect: true,
//       binLookUpResponse,
//     }
//   } catch (err) {
//     console.log('卡号校验不通过', err)
//     return {
//       isEffect: false,
//     }
//   }
// }
export function checkoutCardNumber(cardNumber: string): boolean {
  /**
   * 模10算法参考
   * https://gist.github.com/tonyc726/60ad6a229b582c6791d7
   */

  // 卡号字符串化并去除空格，仅保留数字
  const strDigits = (cardNumber + '').replace(/[\D]/g, '')
  // 银行卡号必须为12-19位数字
  if (!/^\d{12,19}$/.test(strDigits)) {
    return false
  }

  // 根据luhn规则，将卡号数组化，并反转顺序，以便于操作
  const luhnDigits = strDigits.split('').reverse()
  // 取第1位作为后续的验证号码
  const luhnCheckcode = parseInt(luhnDigits.shift(), 10)
  const loopLength = luhnDigits.length
  let loopIndex = loopLength
  let luhnSum = 0

  for (; loopIndex > 0; loopIndex--) {
    const _i = loopLength - loopIndex,
      _k = parseInt(luhnDigits[_i], 10)
    let _add_val = _k
    // 偶数字段 需要*2，并且大于10的数字要相加2个位数的值
    if (_i % 2 === 0) {
      const _k2 = _k * 2
      switch (_k2) {
        case 10:
          _add_val = 1
          break
        case 12:
          _add_val = 3
          break
        case 14:
          _add_val = 5
          break
        case 16:
          _add_val = 7
          break
        case 18:
          _add_val = 9
          break
        default:
          _add_val = _k2
      }
    }
    luhnSum += _add_val
  }

  /* 方法1
      1. 从校验位开始，从右往左，偶数位乘2，然后将两位数字的个位与十位相加；
      2. 计算所有数字的和（67）；
      3. 乘以9（603）；
      4. 取其个位数字（3），得到校验位。
     */
  const luhnSum9 = luhnSum * 9
  const luhnSum9LastCode = parseInt((luhnSum9 + '').replace(/\d+(\d$)/, '$1'), 10)
  return luhnSum9LastCode === luhnCheckcode

  // return /^\d{12,19}$/.test(cardNumber)
}

export function checkEbanxExpiration(expiration: string): boolean {
  // if (expiration.length < 7) {
  //   return true
  // }
  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth() + 1
  const timeArr = expiration.split('/')
  const customYear = Number(timeArr[1])
  const customMonth = Number(timeArr[0])
  if (customMonth < 1 || customMonth > 12) {
    return false
  }
  if (currentYear < customYear) {
    return true
  } else if (currentYear === customYear && currentMonth <= customMonth) {
    return true
  }
  return false
}

export function checkCVV(cvv: string): boolean {
  return /^\d{3,4}$/.test(cvv)
}
