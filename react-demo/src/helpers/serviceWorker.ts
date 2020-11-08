export interface ServiceWorkerMessage {
  id: string
  action: MessageEnum
  data: any
  status: MessageStatusEnum
}

export interface PromiseMap {
  resolve?: any
  reject?: any
}

export enum MessageEnum {
  PageUpdateConfig = 'pageUpdateConfig',
}

export enum MessageStatusEnum {
  beforeSend,
  success,
  fail,
}

class ServiceWorker {
  isSupport!: boolean
  serviceWorker!: ServiceWorkerContainer
  registration!: ServiceWorkerRegistration // 注册的serviceWorker

  constructor(scriptURL: string, options: RegistrationOptions) {
    this.isSupport = false
    if ('serviceWorker' in navigator) {
      // Register a service worker hosted at the root of the site using the default scope.
      this.serviceWorker = navigator.serviceWorker
      this.serviceWorker
        .register(scriptURL, options)
        .then((registration: ServiceWorkerRegistration) => {
          console.log('Service worker registration succeeded:', registration)
          this.registration = registration
          this.isSupport = true
          // At this point, you can optionally do something
          // with registration. See https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
        })
        .catch(error => {
          console.log('Service worker registration failed:', error)
        })

      // Independent of the registration, let's also display
      // information about whether the current page is controlled
      // by an existing service worker, and when that
      // controller changes.

      // First, do a one-off check if there's currently a
      // service worker in control.
      if (this.serviceWorker.controller) {
        console.log('This page is currently controlled by:', this.serviceWorker.controller)
      }

      // Then, register a handler to detect when a new or
      // updated service worker takes control.
      this.serviceWorker.oncontrollerchange = () => {
        console.log('This page is now controlled by:', this.serviceWorker.controller)
      }
    } else {
      console.log('Service workers are not supported.')
    }
  }
}

class ServiceWorkerControl {
  static promiseMap: Record<string, PromiseMap> = {}
  static sw: ServiceWorker

  static initServiceWorker(address: string) {
    if (!this.sw) {
      this.sw = new ServiceWorker(address, {})
      this.sw.serviceWorker.ready.then(() => {
        this.sw.serviceWorker.addEventListener('message', event => {
          // event is a MessageEvent object
          console.log('The service worker sent me a message:', event.data)
          console.log('promiseMap', this.promiseMap)
          if (this.promiseMap && this.promiseMap[event.data.id]) {
            if (event.data.staus === MessageStatusEnum.success) {
              this.promiseMap[event.data.id].resolve(event.data.data)
            } else {
              this.promiseMap[event.data.id].resolve(event.data.data)
            }
            this.promiseMap[event.data.id] = {}
            delete this.promiseMap[event.data.id]
          }
        })
      })
    }
  }

  static getIsSupport(): boolean {
    return this.sw.isSupport
  }

  static getRegistration(): ServiceWorkerRegistration {
    return this.sw.registration
  }

  static messageTransfer(serviceWorkerMessage: ServiceWorkerMessage): Promise<any> {
    const messageTransferPromise = new Promise((resolve, reject) => {
      this.promiseMap[serviceWorkerMessage.id] = {
        resolve,
        reject,
      }
    })
    this.sw.registration.active?.postMessage(JSON.parse(JSON.stringify(serviceWorkerMessage)))
    return messageTransferPromise
  }
}

export {ServiceWorker, ServiceWorkerControl}
