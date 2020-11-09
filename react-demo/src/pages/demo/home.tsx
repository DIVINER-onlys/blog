import React from 'react'
import {Link} from 'react-router-dom'

import {useCommonStore} from 'src/commonStores'
import {ServiceWorkerControl, ServiceWorkerMessage, MessageEnum, MessageStatusEnum} from 'src/helpers/serviceWorker'
import './index.less'

// import style from './index.less'
import style1 from './index.module.scss'

const Home = () => {
  const {testStore} = useCommonStore()
  testStore.useWatch('changeUiTest')

  return (
    <div className={'home'}>
      <div className={'logo'}>
        <img src={require('src/assets/logo.png')} alt="" />
      </div>

      <div className={'serviceWorker'}>
        <button
          onClick={async () => {
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
            console.log('server worker数据：', res)
          }}
        >
          serviceWorker测试
        </button>
      </div>

      <div>
        {testStore.changeUiTest}
        <br />
        <div
          className={style1.btntest}
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

      <br />
      <div>
        <Link to="/about">去about页</Link>
      </div>
    </div>
  )
}

export default Home
