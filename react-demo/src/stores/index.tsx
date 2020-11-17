import React, {useContext} from 'react'
import {useLocalStore} from 'mobx-react-lite'

import configStores, {TconfigStore} from 'src/stores/config'

type StoreProviderPropsType = {
  children: React.ReactNode
}

const storeContext = React.createContext<TconfigStore | null>(null)

export const StoreProvider = ({children}: StoreProviderPropsType) => {
  const Stores: TconfigStore | any = {}
  for (const k in configStores) {
    Stores[k] = useLocalStore(configStores[k])
  }

  return <storeContext.Provider value={Stores}>{children}</storeContext.Provider>
}

export const useStores = () => {
  const stores = useContext(storeContext)
  if (!stores) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('useStore must be used within a StoreProvider.')
  }
  return stores
}
