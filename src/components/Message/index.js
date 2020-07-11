import React from 'react'
import Typist from 'react-typist'

export function Message({message, done}) {
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

  const handleDone = () => done(true)

  return (
    <Typist
      avgTypingDelay={50}
      cursor={{show: false}}
      onTypingDone={handleDone}
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
