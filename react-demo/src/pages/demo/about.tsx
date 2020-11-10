import React from 'react'
import {Link, useHistory, useParams} from 'react-router-dom'

import style from './index.module.scss'
const About = () => {
  const history = useHistory()
  const params: {id: string} = useParams()
  return (
    <div className={style.about}>
      <div>
        <Link to="/">回到首页</Link>
        <br />
        <div>{params.id ?? '没传id'}</div>
        <div></div>
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
