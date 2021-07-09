import { createListHandler } from './create-handler.js'

export const listOverwatchProfileHistory = createListHandler((event) => {
  const username = event.pathParameters?.username as string

  return {
    path: `/overwatch/profiles/${Buffer.from(username, 'utf8').toString('hex')}/`
  }
})