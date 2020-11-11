import React, {useCallback} from 'react'
import {Link} from 'react-router-dom'

import {useCommonStore} from 'src/commonStores'
import {ServiceWorkerControl, ServiceWorkerMessage, MessageEnum, MessageStatusEnum} from 'src/helpers/serviceWorker'
import style from './index.module.scss'
import ingoreStyle from './index_ignore.module.scss'
import eventBus from 'src/helpers/eventBus'
import {debounce, throttle} from 'src/helpers/utils'

const Home = () => {
  const {testStore} = useCommonStore()
  testStore.useWatch('changeUiTest')

  const test = useCallback((obj: any) => {
    console.log('常规事件: ', obj)
  }, [])

  const testDebounce = debounce(test, 500)
  const testImmediateDebounce = debounce(test, 500, true)
  const testThrottle = throttle(test, 500)
  const testImmediateThrottle = throttle(test, 500, true)

  return (
    <div className={`${style.home} homeGlobal`}>
      <div className={style.logo}>
        <img src={require('src/assets/logo.png')} alt="" />
      </div>

      <div className={style.serviceWorker}>
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
          className={style.ignore_btn}
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
          className={`${style.btn} ${ingoreStyle.btn1}`}
          onClick={() => {
            testStore.setNoChangeUiTest(`${testStore.noChangeUiTest}1`)
          }}
        >
          修改noChangeUiTest不会重新渲染ui
        </div>
      </div>

      <br />
      <div>
        <Link to="/about/id1?test=11">去about页</Link>
      </div>
      <div>
        <Link to="/404">去404页</Link>
      </div>

      <br />
      <br />
      <div>
        <button
          onClick={() => {
            eventBus.on('test', test)
          }}
        >
          eventBus常规事件监听
        </button>
        <button
          onClick={() => {
            eventBus.emit('test', {test: 1})
          }}
        >
          eventBus常规事件触发
        </button>
        <button
          onClick={() => {
            eventBus.off('test', test)
          }}
        >
          eventBus常规事件移除
        </button>
      </div>
      <br />
      <div>
        <button
          onClick={() => {
            eventBus.once('test', test)
          }}
        >
          eventBus一次性事件监听
        </button>
        <button
          onClick={() => {
            eventBus.emit('test', {test: 1})
          }}
        >
          eventBus一次性事件触发
        </button>
      </div>
      <br />
      <br />

      <div>
        <button
          onClick={() => {
            testDebounce('后置防抖')
          }}
        >
          后置防抖
        </button>
        <button
          onClick={() => {
            testImmediateDebounce('前置防抖')
          }}
        >
          前置防抖
        </button>
        <button
          onClick={() => {
            testThrottle('后置节流')
          }}
        >
          后置防抖
        </button>
        <button
          onClick={() => {
            testImmediateThrottle('前置节流')
          }}
        >
          前置防抖
        </button>
      </div>
    </div>
  )
}

export default Home
