import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {RingLoader} from 'react-spinners'

import {store} from 'store/store'

import {Message} from 'components'

import {fetchMessages} from 'services/api'

export function Welcome({next}) {
  const [done, setDone] = React.useState(false)
  const [name, setName] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [messages, setMessages] = React.useState(null)
  const [messageId, setMessageId] = React.useState(null)

  const {dispatch} = React.useContext(store)

  const handleChange = event => {
    setName(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const payload = {}
    payload[messageId] = name

    dispatch({
      type: 'update-answers',
      payload: {answer: {...payload}, id: messageId},
    })
    next()
  }

  React.useEffect(() => {
    async function fetchData() {
      const apiResponse = await fetchMessages()
      setMessages(apiResponse.data.messages)
      setMessageId(apiResponse.data.id)
      setLoading(false)
    }

    fetchData()

    return () => fetchData()
  }, [])

  if (loading) return <RingLoader />

  return (
    <>
      <Message message={messages} done={setDone} />
      {done && (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            label="Nome"
            value={name}
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
