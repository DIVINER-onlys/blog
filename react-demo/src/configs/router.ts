import DemoRouter from 'src/pages/demo/router'

export type Troutes = {
  path: string
  component?: any
  routes?: Array<Troutes>
  exact?: boolean
}

export const routes: Array<Troutes> = [...DemoRouter]
