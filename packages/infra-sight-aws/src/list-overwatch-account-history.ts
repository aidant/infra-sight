import { createListHandler } from './create-handler.js'

export const listOverwatchAccountHistory = createListHandler((event) => {
  const username = event.pathParameters?.username as string

  return {
    path: `/overwatch/accounts/${Buffer.from(username, 'utf8').toString('hex')}/`
  }
})