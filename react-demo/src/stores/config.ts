import {demoStore, DemoStoreType} from 'src/stores/demo/demoStore'

const stores: {[key: string]: () => any} = {
  demoStore,
}

export type TconfigStore = {
  demoStore: DemoStoreType
}

export default stores
