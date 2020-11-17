import React from 'react'

import 'src/App.scss'
import {StoreProvider} from 'src/stores'
import RouterComp from 'src/components/RouterComp'

const App = () => {
  return (
    <StoreProvider>
      <RouterComp></RouterComp>
    </StoreProvider>
  )
}

export default App
