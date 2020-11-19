import React, {useCallback, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {observer} from 'mobx-react-lite'

import {useStores} from 'src/stores'
import {useCommonStore} from 'src/commonStores'
import {ServiceWorkerControl, ServiceWorkerMessage, MessageEnum, MessageStatusEnum} from 'src/helpers/serviceWorker'
import style from './index.module.scss'
import ingoreStyle from './index_ignore.module.scss'
import eventBus from 'src/helpers/eventBus'
import {debounce, throttle, testMapLimit, curry} from 'src/helpers/utils'
import MyPromise, {SimualationPromiseFinally} from 'src/helpers/myPromise'
import CollapsePanel from 'src/components/CollapsePanel'

const Home = () => {
  const {demoStore} = useStores()
  const {testStore} = useCommonStore()
  testStore.useWatch('changeUiTest')

  const test = useCallback((obj: any) => {
    console.log('常规事件: ', obj)
  }, [])

  const testDebounce = debounce(test, 500)
  const testImmediateDebounce = debounce(test, 500, true)
  const testThrottle = throttle(test, 500)
  const testImmediateThrottle = throttle(test, 500, true)

  useEffect(() => {
    const line = 1 // 显示的行数
    const str =
      's这是一段测试文字，this is some test text，测试文字，测试文字测 测试文字，测试文字测 测试文字，测试文字测测试文字，测试文字测'
    const testEllipsis = document.getElementById('testEllipsis') as HTMLElement
    for (let i = 0; i < str.length; i++) {
      testEllipsis.innerHTML = str.substring(0, i)
      console.log('每次获取高度', testEllipsis?.offsetHeight * line, testEllipsis?.scrollHeight)
      if ((testEllipsis?.offsetHeight * line || 0) < (testEllipsis?.scrollHeight || 0)) {
        console.log('超过line行高获取高度', testEllipsis?.scrollHeight)
        // testEllipsis.style.overflow = 'hidden'
        testEllipsis.innerHTML = str?.substring(0, i - 3) + '...'
        break
      }
    }
  })

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
          后置节流
        </button>
        <button
          onClick={() => {
            testImmediateThrottle('前置节流')
          }}
        >
          前置节流
        </button>
      </div>

      <div>
        <button
          onClick={async () => {
            testMapLimit()
              .then(res => {
                console.log('并发后的值', res)
              })
              .catch(err => {
                console.log('并发错误', err)
              })
          }}
        >
          并发控制
        </button>
      </div>

      <br />
      <br />
      <div>
        <button
          onClick={() => {
            const promise = new MyPromise((resolve: any, reject: any) => {
              setTimeout(() => {
                console.log('测试myPromise')
                resolve('我是传输数据')
              }, 2000)
            })
            promise.then(
              (res: any) => {
                console.log('测试MyPromise成功', res)
              },
              (err: any) => {
                console.log('测试MyPromise失败', err)
              }
            )
          }}
        >
          测试MyPromise
        </button>
      </div>

      <br />
      <br />
      <div>
        <button
          onClick={() => {
            function sum(a: number, b: number, c: number) {
              return a + b + c
            }
            const testCurry = curry(sum)
            console.log(testCurry(1, 2, 3))
            console.log(testCurry(1)(2, 3))
          }}
        >
          测试柯里化
        </button>
      </div>

      <br />
      <br />
      <div style={{width: '100%'}}>
        <CollapsePanel
          list={[
            {
              data: {payChannel: '父级'},
              children: [{level: '子级'}],
            },
          ]}
          render={({data, index}) => {
            return <div>{JSON.stringify(data)}</div>
          }}
          subRender={({data, parent, index}) => {
            return <div>{JSON.stringify(data)}</div>
          }}
        ></CollapsePanel>
      </div>

      <br />
      <br />
      <div>
        <button
          onClick={() => {
            if (demoStore.message.message1) {
              demoStore.setMessage({message2: 'message2'})
            } else {
              demoStore.setMessage({message1: 'message1'})
            }
          }}
        >
          mobx改变
        </button>
        <div>{JSON.stringify(demoStore.message)}</div>
        <div>{demoStore?.message?.message2}</div>
      </div>

      <br />
      <br />
      <div id="testEllipsis" style={{height: '20px'}}></div>
      <div className={style.ellipsis}>
        <div className={style.onlyLine}>啊啊啊啊啊啊啊爱的速递sdsd asdsd sdfsddfdfdfaa aa啊啊啊</div>
      </div>
      <div className={style.ellipsis}>
        <div className={style.mulLine}>啊啊啊啊啊啊啊爱的速递sdsd asdsd sdfsddfdfdfaa aa啊啊啊</div>
      </div>
      <br />
      <br />

      <div>
        <input
          type="text"
          onChange={e => {
            console.log('随时随地', e, e.target.composing)
          }}
        />
      </div>
      <br />
      <br />

      <div>
        <button onClick={SimualationPromiseFinally}>模拟promise.finally</button>
      </div>
    </div>
  )
}

export default observer(Home)
