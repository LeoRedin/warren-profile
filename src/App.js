import React from 'react'

import {StateProvider} from 'store/store'

import {Welcome, Age, Interest} from 'views'

import 'styles/normalize.css'
import 'styles/global.css'

function App() {
  const [step, setStep] = React.useState(0)

  const handleNext = () => setStep(step + 1)

  return (
    <StateProvider>
      <Welcome next={handleNext} />
      {step >= 1 && <Age next={handleNext} />}
      {step >= 2 && <Interest next={handleNext} />}
    </StateProvider>
  )
}

export default App
