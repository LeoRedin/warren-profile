import React, {Suspense} from 'react'
import {RingLoader} from 'react-spinners'

import {StateProvider} from 'store/store'

import {Welcome} from 'views'

import 'styles/normalize.css'
import 'styles/global.css'

function App() {
  return (
    <StateProvider>
      <Suspense fallback={<RingLoader loading />}>
        <Welcome />
      </Suspense>
    </StateProvider>
  )
}

export default App
