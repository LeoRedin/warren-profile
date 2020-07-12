import React from 'react'
import Button from '@material-ui/core/Button'

import {Message} from 'components'

import {store} from 'store/store'

import {fetchMessages} from 'services/api'

export function Read({next}) {
  const [done, setDone] = React.useState(false)

  const [option, setOption] = React.useState('')
  const [messages, setMessages] = React.useState(null)
  const [messageId, setMessageId] = React.useState(null)

  const {state, dispatch} = React.useContext(store)

  const handleSubmit = event => {
    event.preventDefault()

    const payload = {}
    payload[messageId] = option

    dispatch({
      type: 'update-answers',
      payload: {answer: {...payload}, id: messageId},
    })
    next()
  }

  React.useEffect(() => {
    async function fetchData() {
      const context = {
        id: state.id,
        answers: {
          ...state.answers,
        },
      }
      const apiResponse = await fetchMessages(context)
      setMessages(apiResponse?.data?.messages)
      setMessageId(apiResponse?.data?.id)
    }

    fetchData()

    return () => fetchData()
  }, [])

  if (!messages) return null

  return (
    <>
      <Message message={messages} done={setDone} />
      {done && (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Button
            onClick={() => setOption('P')}
            type="submit"
            variant="contained"
            color="primary"
          >
            Não
          </Button>
          <Button
            onClick={() => setOption('A')}
            type="submit"
            variant="contained"
            color="primary"
          >
            Sim
          </Button>
        </form>
      )}
    </>
  )
}
