import MyXMLHttpRequest from './XMLHttpRequest'

const instance = new MyXMLHttpRequest({
  baseURL: 'https://charge-admin-test.yy.com',
  withCredentials: true,
  timeout: 15000,
})

export default instance
