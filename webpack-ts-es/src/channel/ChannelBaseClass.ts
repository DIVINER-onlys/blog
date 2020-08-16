class ChannelBaseClass {
  constructor() {}

  protected renderToDom(html: Element, domId: string): void {
    if (domId.length > 0) {
      document.querySelector(`#${domId}`).appendChild(html)
    } else {
      document.querySelector('body').append(html)
    }
  }
}

export default ChannelBaseClass
