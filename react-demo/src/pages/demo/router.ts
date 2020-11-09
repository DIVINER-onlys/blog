import {lazy} from 'react'

export default [
  {
    path: '/',
    component: lazy(() => import('src/pages/demo/home')),
    exact: true,
  },
  {
    path: '/about',
    component: lazy(() => import('src/pages/demo/about')),
    exact: false,
  },
]
