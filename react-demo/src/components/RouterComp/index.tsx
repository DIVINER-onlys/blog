import React, {Suspense, useEffect} from 'react'
import {Route, BrowserRouter as Router, Switch, useLocation} from 'react-router-dom'

import LoadingComp from '../LoadingComp'
import P404Comp from '../P404Comp'
import {routes, Troutes} from 'src/configs/router'

export default function RouterComp() {
  return (
    <Router>
      <Suspense fallback={<LoadingComp />}>
        <SwitchMainRouter />
      </Suspense>
    </Router>
  )
}

const SwitchMainRouter = () => {
  usePageViews()
  return (
    <Switch>
      {RoutersComp()}
      <Route>
        <P404Comp />
      </Route>
    </Switch>
  )
}

function usePageViews() {
  const location = useLocation()
  useEffect(() => {
    console.log('pageView', location, location.pathname)
    // window.scrollTo(0, 0)
  }, [location])
}

const RoutersComp = () => routes.map((route: Troutes, i: number) => <RouteWithSubRoutes key={i} {...route} />)

// const RoutersComp = () => {
//   return (
//     routes.length > 0 &&
//     routes.map((route, i) => {
//       if (route.path === '/') {
//         return <Route exact path="/" key={i} component={route.component} />
//       } else {
//         return <RouteWithSubRoutes key={i} {...route} />
//       }
//     })
//   )
// }

const RouteWithSubRoutes = (route: Troutes) => {
  return (
    (route.component && (
      <Route
        exact={route.exact || false}
        path={route.path}
        render={props => <route.component {...props} routes={route.routes} />}
      />
    )) || <SwitchRouter routes={route.routes} />
  )
}

export const SwitchRouter = ({routes}: {routes?: Array<Troutes>}) => {
  return (
    <Switch>
      {routes && routes.length > 0 && routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </Switch>
  )
}
