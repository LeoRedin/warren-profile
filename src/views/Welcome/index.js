import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {RingLoader} from 'react-spinners'

import {Message} from 'components'

import {fetchMessages} from 'services/api'

export function Welcome() {
  const [done, setDone] = React.useState(false)
  const [name, setName] = React.useState('')
  const [loading, setLoading] = React.useState(true)
  const [messages, setMessages] = React.useState(null)

  const handleChange = event => {
    setName(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
  }

  React.useEffect(() => {
    async function fetchData() {
      const apiResponse = await fetchMessages()
      setMessages(apiResponse.data.messages)
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
            id="namename"
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
