import React from 'react'

import 'src/App.less'
import {useCommonStore} from './commonStores'
import {ServiceWorkerControl, ServiceWorkerMessage, MessageEnum, MessageStatusEnum} from 'src/helpers/serviceWorker'

const App = () => {
  console.log('ss', useCommonStore)
  const {testStore} = useCommonStore()
  testStore.useWatch('changeUiTest')

  return (
    <div className={'App'}>
      <div>
        <button
          onClick={async () => {
            console.log('发发发')
            const serviceWorkerMessage: ServiceWorkerMessage = {
              id: `${Math.random()}`,
              action: MessageEnum.PageUpdateConfig,
              data: {
                levelList: [
                  {id: 1, test: 'testchange'},
                  {id: 2, test1: 'test1'},
                ],
                originLevelList: [{id: 1, test: 'test'}],
              },
              status: MessageStatusEnum.beforeSend,
            }
            const res = await ServiceWorkerControl.messageTransfer(serviceWorkerMessage)
            console.log('啊啊啊', res)
          }}
        >
          发送
        </button>
        <div>App</div>
        <img src={require('src/assets/logo.png')} alt="" />
        <div>
          {testStore.changeUiTest}
          <br />
          <div
            className={'btn'}
            onClick={() => {
              testStore.setChangeUiTest(`${testStore.changeUiTest}1`)
            }}
          >
            修改changeUiTest会重新渲染ui
          </div>
        </div>
        <br />
        <div>
          {testStore.noChangeUiTest}
          <br />
          <div
            className={'btn'}
            onClick={() => {
              testStore.setNoChangeUiTest(`${testStore.noChangeUiTest}1`)
            }}
          >
            修改noChangeUiTest不会重新渲染ui
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
