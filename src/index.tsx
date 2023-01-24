import React from 'react'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { NativeBaseProvider } from 'native-base'
import Calculator from './calculator'

function index() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Calculator />
      </NativeBaseProvider>
    </Provider>
  )
}

export default index