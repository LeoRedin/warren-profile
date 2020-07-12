import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'

import {Message} from 'components'

import {store} from 'store/store'

import {fetchMessages} from 'services/api'

export function Income({next}) {
  const [done, setDone] = React.useState(false)
  const [income, setIncome] = React.useState('')
  const [messages, setMessages] = React.useState(null)
  const [messageId, setMessageId] = React.useState(null)

  const {state, dispatch} = React.useContext(store)

  const handleChange = event => {
    setIncome(event.target.value)
  }

  const handleSubmit = event => {
    event.preventDefault()

    const payload = {}
    payload[messageId] = +income

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
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="income">Amount</InputLabel>
            <OutlinedInput
              id="income"
              value={income}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
              labelWidth={60}
            />
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </form>
      )}
    </>
  )
}
