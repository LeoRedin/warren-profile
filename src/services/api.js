import axios from 'axios'

import {status} from 'variables'

const api = axios.create({
  baseURL: 'https://api.dev.oiwarren.com/api/v2/conversation/message',
})

function wrapPromise(promise) {
  let promiseStatus = status.PENDING
  let result
  const suspender = promise.then(
    r => {
      promiseStatus = status.SUCCESS
      result = r
    },
    e => {
      promiseStatus = status.ERROR
      result = e
    },
  )
  return {
    read() {
      if (promiseStatus === status.PENDING) {
        throw suspender
      } else if (promiseStatus === status.ERROR) {
        throw result
      } else if (promiseStatus === status.SUCCESS) {
        return result
      }
    },
  }
}

function fetchMessage(context) {
  const defaultContext = {
    context: 'suitability',
  }
  return api.post('/', {...defaultContext, ...context})
}

export function fetchMessageData(context) {
  const messagePromise = fetchMessage(context)

  return {
    message: wrapPromise(messagePromise),
  }
}
