import React from 'react'

import {StateProvider} from 'store/store'

import {Welcome} from 'views'

import 'styles/normalize.css'
import 'styles/global.css'

function App() {
  return (
    <StateProvider>
      <Welcome />
    </StateProvider>
  )
}

export default App
