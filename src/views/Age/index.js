import React from 'react'
import {store} from 'store/store'

export function Age() {
  const {state} = React.useContext(store)
  console.log('Age -> state', state)
  return <div>AGE</div>
}
