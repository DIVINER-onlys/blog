import {parseHeaders} from './utils'
// import {createError} from './utils/createError'
// import {buildURL} from './utils/buildURL'

interface Config {
  baseURL?: string
  withCredentials?: boolean
  timeout?: number
  timeoutErrorMessage?: string
  responseType?: string
  paramsSerializer?: Function
  // method?: string
  // url?: string
  // data?: any
  // params?: any
}

class MyXMLHttpRequest {
  xhr: XMLHttpRequest
  config: Config = {}
  httpType = 'GET'

  constructor(config: Config) {
    this.init(config)
  }

  init(config: Config) {
    if (window.XMLHttpRequest) {
      this.xhr = new XMLHttpRequest()
    } else if (window.ActiveXObject) {
      // 老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象
      this.xhr = new window.ActiveXObject('Microsoft.XMLHTTP')
    }
    if (!this.xhr) {
      alert('Your browser does not support XMLHttp')
      return
    }
    this.config = config
    this.xhr.timeout = this.config.timeout || 0
    // Add withCredentials to request if needed
    if (this.config.withCredentials !== undefined) {
      this.xhr.withCredentials = !!this.config.withCredentials
    }
  }

  xhrAdapter(httpUrl: string, params?: Object) {
    return new Promise((resolve, reject) => {
      // Listen for ready state
      this.xhr.onreadystatechange = () => {
        if (!this.xhr || this.xhr.readyState !== 4) {
          return
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (this.xhr.status === 0 && !(this.xhr.responseURL && this.xhr.responseURL.indexOf('file:') === 0)) {
          return
        }

        // Prepare the response
        const responseHeaders =
          'getAllResponseHeaders' in this.xhr ? parseHeaders(this.xhr.getAllResponseHeaders()) : null
        const responseData =
          !this.config.responseType || this.config.responseType === 'text' ? this.xhr.responseText : this.xhr.response
        const response = {
          data: responseData,
          status: this.xhr.status,
          statusText: this.xhr.statusText,
          headers: responseHeaders,
          config: this.config,
          request: this.xhr,
        }

        resolve(response)
      }

      // Handle low level network errors
      this.xhr.onerror = () => {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        // reject(createError('Network Error', this.config, null, this.xhr))
        // Clean up request
        // request = null
      }

      // Handle timeout
      this.xhr.ontimeout = () => {
        let timeoutErrorMessage = 'timeout of ' + this.config.timeout + 'ms exceeded'
        if (this.config.timeoutErrorMessage) {
          timeoutErrorMessage = this.config.timeoutErrorMessage
        }
        // reject(createError(timeoutErrorMessage, this.config, 'ECONNABORTED', this.xhr))

        // Clean up request
        // request = null
      }

      // console.log('sssdf单独', buildURL(httpUrl, params || {}, this.config.paramsSerializer))

      // this?.xhr?.open(this.httpType, buildURL(httpUrl, params || {}, this.config.paramsSerializer), true)
      this?.xhr?.open(this.httpType, httpUrl, true)
      this.xhr.setRequestHeader('Content-type', 'application/json')
      this.xhr.send(params ? JSON.stringify(params) : null)
    })
  }

  get(httpUrl: string, params?: Object) {
    this.httpType = 'GET'
    return this.xhrAdapter(httpUrl, params)
  }

  post(httpUrl: string, params?: Object) {
    this.httpType = 'POST'
    return this.xhrAdapter(httpUrl, params)
  }
}

export default MyXMLHttpRequest
