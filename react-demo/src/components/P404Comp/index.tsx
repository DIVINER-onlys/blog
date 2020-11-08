import React from 'react'
import {Link} from 'react-router-dom'

import './P404Comp.less'

const P404Comp = () => (
  <div className={'P404Comp'}>
    找不到相应的页面！
    <Link to="/">返回首页</Link>
  </div>
)

export default P404Comp
