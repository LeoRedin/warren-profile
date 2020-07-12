import React from 'react'

import {StateProvider} from 'store/store'

import {Welcome, Age, Interest, Preference, Income} from 'views'

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
      {step >= 3 && <Preference next={handleNext} />}
      {step >= 4 && <Income next={handleNext} />}
    </StateProvider>
  )
}

export default App
