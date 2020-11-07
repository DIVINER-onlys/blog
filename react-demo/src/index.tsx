import React from 'react'
import ReactDom from 'react-dom'

import App from './App'
import 'src/index.less'
// import {ServiceWorker} from 'src/helpers/serviceWorker'

ReactDom.render(<App />, 
  document.getElementById('root'))

// ServiceWorker.test()
