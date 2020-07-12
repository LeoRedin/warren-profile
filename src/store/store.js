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
          answers: {
            ...reducerState.answers,
            ...action.payload.answer,
          },
          id: action.payload.id,
        }
      default:
        return {
          ...reducerState,
        }
    }
  }, initialState)

  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {store, StateProvider}
