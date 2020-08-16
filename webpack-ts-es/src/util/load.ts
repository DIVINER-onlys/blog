function loadScript(url: string): void {
  const scrs = document.getElementsByTagName('script')
  const last = scrs[scrs.length - 1]
  const scr = document.createElement('script')
  scr.src = url
  scr.async = true
  last.parentNode.insertBefore(scr, last)
}

function loadStyle(url: string): void {
  const fileref = document.createElement('link')
  fileref.setAttribute('rel', 'stylesheet')
  fileref.setAttribute('type', 'text/css')
  fileref.setAttribute('href', url)
  document.getElementsByTagName('head')[0].appendChild(fileref)
}

export {loadScript, loadStyle}
