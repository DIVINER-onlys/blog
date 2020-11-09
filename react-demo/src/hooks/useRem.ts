export function useRem() {
  const baseSize = 16

  // 设置 rem 函数
  function setRem() {
    const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端

    const clientWidth = document.documentElement.clientWidth
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改
    const scale = Math.min(clientWidth / 375, 2)
    // 设置页面根节点字体大小
    if (clientWidth < 768) {
      document.documentElement.style.fontSize = baseSize * scale + 'px'
    } else {
      document.documentElement.style.fontSize = baseSize + 'px'
    }
    if (isIOS) {
      document.documentElement.style.fontSize = baseSize + 'px'
      // 兼容 IOS iframe 宽度变大
      document.documentElement.style.width = '100vw'
    }
  }

  // 初始化
  setRem()

  // 改变窗口大小时重新设置 rem
  window.onresize = function () {
    setRem()
  }
}
