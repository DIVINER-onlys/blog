import React from 'react'
import ReactDom from 'react-dom'

import App from './App'
import 'src/index.less'
// import {ServiceWorkerControl} from 'src/helpers/serviceWorker'

ReactDom.render(<App />, document.getElementById('root'))
console.log('before sw init')
// ServiceWorkerControl.initServiceWorker('/sw.js')
