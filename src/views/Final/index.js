import React from 'react'

import {Message} from 'components'

import {store} from 'store/store'

import {fetchMessages} from 'services/api'

export function Final() {
  const [setDone] = React.useState(false)
  const [messages, setMessages] = React.useState(null)

  const {state} = React.useContext(store)

  React.useEffect(() => {
    async function fetchData() {
      const context = {
        id: state.id,
      }
      const apiResponse = await fetchMessages(context)
      setMessages(apiResponse?.data?.messages)
    }

    fetchData()

    return () => fetchData()
  }, [])

  if (!messages) return null

  return <Message message={messages} done={setDone} />
}
