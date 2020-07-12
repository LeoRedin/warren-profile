import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.dev.oiwarren.com/api/v2/conversation/message',
})

export async function fetchMessages(context) {
  const defaultContext = {
    context: 'suitability',
  }

  try {
    const {data} = await api.post('/', {...defaultContext, ...context})

    return {success: true, data}
  } catch (err) {
    return {success: false, error: err}
  }
}
