import React from 'react'

import 'src/App.less'
import {useCommonStore} from './commonStores'

const App = () => {
  console.log('ss', useCommonStore)
  const {testStore} = useCommonStore()
  testStore.useWatch('changeUiTest')

  return (
  <div className={"App"}>
    <div>
      <div>App</div>
      <div>
        {testStore.changeUiTest}
        <br/>
        <div className={"btn"}  onClick={() => {testStore.setChangeUiTest(`${testStore.changeUiTest}1`)}}>
          修改changeUiTest会重新渲染ui
        </div>
      </div>
      <br/>
      <div>
        {testStore.noChangeUiTest}
        <br/>
        <div className={"btn"} onClick={() => {testStore.setNoChangeUiTest(`${testStore.noChangeUiTest}1`)}}>
          修改noChangeUiTest不会重新渲染ui
        </div>
      </div>
    </div>
  </div>
  )
}

export default App