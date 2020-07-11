import React from 'react'
import Typist from 'react-typist'

export function Message({message}) {
  console.log('Message -> message', message)
  const returnValues = []

  message.map(({value}) => {
    const split = value.split('^')

    return split.map(item => {
      const hasNumber = item.match(/(\d+)/)
      if (hasNumber) {
        const delay = hasNumber[0]
        const cleanItem = item.replace(delay, '')
        returnValues.push(+delay)
        return returnValues.push(cleanItem)
      } else {
        return returnValues.push(item)
      }
    })
  })

  return (
    <Typist
      avgTypingDelay={50}
      cursor={{show: false}}
      onTypingDone={() => console.log('done')}
    >
      {returnValues.map((value, index) =>
        typeof value === 'number' ? (
          <Typist.Delay ms={value} key={value + index} />
        ) : (
          <span key={value}>{value}</span>
        ),
      )}
    </Typist>
  )
}
