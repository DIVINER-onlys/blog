import {lazy} from 'react'

export default [
  {
    path: '/',
    component: lazy(() => import('src/pages/demo/home')),
    exact: false,
  },
  {
    path: '/about',
    component: lazy(() => import('src/pages/demo/about')),
    exact: false,
  },
]
