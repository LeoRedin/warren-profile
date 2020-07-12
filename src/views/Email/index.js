import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import {Message} from 'components'

import {store} from 'store/store'

import {fetchMessages} from 'services/api'

export function Email({next}) {
  const [done, setDone] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [messages, setMessages] = React.useState(null)
  const [messageId, setMessageId] = React.useState(null)

  const {state, dispatch} = React.useContext(store)

  const handleChange = event => {
    setEmail(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const payload = {}
    payload[messageId] = +email

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
          <TextField
            fullWidth
            id="email"
            label="Email"
            value={email}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </form>
      )}
    </>
  )
}
