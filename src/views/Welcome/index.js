import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import {Message} from 'components'

import {fetchMessageData} from 'services/api'

const context = {
  id: null,
  answers: {},
}

const resource = fetchMessageData(context)

export function Welcome() {
  const [done, setDone] = React.useState(false)
  const [name, setName] = React.useState('')

  const handleChange = event => {
    setName(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()
  }

  const {
    data: {messages},
  } = resource.message.read()

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
