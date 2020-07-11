import React, {createContext, useReducer} from 'react'

const initialState = {
  answers: {},
}
const store = createContext(initialState)
const {Provider} = store

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer((reducerState, action) => {
    switch (action.type) {
      case 'update-answers':
        return {
          ...reducerState,
          ...action.payload,
        }
      default:
        throw new Error()
    }
  }, initialState)

  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {store, StateProvider}
