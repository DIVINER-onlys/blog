import React from 'react'
import {Link} from 'react-router-dom'

import style from './index.module.scss'
const About = () => {
  return (
    <div className={style.about}>
      <Link to="/">回到首页</Link>
    </div>
  )
}

export default About
