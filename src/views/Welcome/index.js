import React from 'react'

import {Message} from 'components'

import {fetchMessageData} from 'services/api'

const context = {
  context: 'suitability',
  id: null,
  answers: {},
}

const resource = fetchMessageData(context)

export function Welcome() {
  const [done, setDone] = React.useState(false)
  const {
    data: {messages},
  } = resource.message.read()

  return (
    <>
      <Message message={messages} done={setDone} />
      {done && <div>DONE</div>}
    </>
  )
}
