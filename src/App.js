import React, {Suspense} from 'react'
import {RingLoader} from 'react-spinners'

import {Welcome} from 'views'

function App() {
  return (
    <Suspense fallback={<RingLoader loading />}>
      <Welcome />
    </Suspense>
  )
}

export default App
