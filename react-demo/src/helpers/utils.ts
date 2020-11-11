// https://juejin.im/post/6844903869995024397
export function debounce(fn: Function, delay: number, immediate = false) {
  let timer: any = null
  return function () {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    if (timer) {
      // 清除计时器，并不是将 timer 置为 null
      clearTimeout(timer)
    }
    if (immediate) {
      !timer && fn.apply(that, args)
      timer = setTimeout(function () {
        timer = null
      }, delay)
    } else {
      timer = setTimeout(function () {
        fn.apply(that, args)
      }, delay)
    }
  }
}

export function throttle(fn: Function, delay: number, immediate = false) {
  let timer: any = null
  return function () {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    if (!timer) {
      if (immediate) {
        fn.apply(that, args)
        timer = setTimeout(function () {
          timer = null
        }, delay)
      } else {
        timer = setTimeout(function () {
          timer = null
          fn.apply(that, args)
        }, delay)
      }
    }
  }
}
