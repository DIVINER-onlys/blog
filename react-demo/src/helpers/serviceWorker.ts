export interface PromiseMap {
  resolve?: any
  reject?: any
}

class ServiceWorker {
  isSupport!: boolean
  serviceWorker!: ServiceWorkerContainer
  registration!: ServiceWorkerRegistration // 注册的serviceWorker

  constructor(scriptURL: string, options: RegistrationOptions) {
    this.isSupport = false
    if ('serviceWorker' in navigator) {
      this.serviceWorker = navigator.serviceWorker
      this.serviceWorker
        .register(scriptURL, options)
        .then((registration: ServiceWorkerRegistration) => {
          console.log('Service worker registration succeeded:', registration)
          this.registration = registration
          this.isSupport = true
        })
        .catch(error => {
          console.log('Service worker registration failed:', error)
        })
    } else {
      console.log('Service workers are not supported.')
    }
  }
}

class ServiceWorkerControl {
  static promiseMap: Record<string, PromiseMap> = {}
  static sw: ServiceWorker

  static initServiceWorker(address: string) {
    console.log('sss', address)
    if (!this.sw) {
      this.sw = new ServiceWorker(address, {})
    }
  }
}

export {ServiceWorker, ServiceWorkerControl}
