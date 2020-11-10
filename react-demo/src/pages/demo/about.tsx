import React from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'

import style from './index.module.scss'
const About = () => {
  const history = useHistory()
  const params: {id: string} = useParams()
  const Query = new URLSearchParams(window.location.search)
  return (
    <div className={style.about}>
      <div>
        <Link to="/">回到首页</Link>
        <br />
        <div>路由参数：{params.id ?? '没传id'}</div>
        <br />
        <div>url参数: {Query.get('test')}</div>
        <div
          onClick={() => {
            history.push('/')
          }}
        >
          编程式回到首页
        </div>
      </div>
    </div>
  )
}

export default About
