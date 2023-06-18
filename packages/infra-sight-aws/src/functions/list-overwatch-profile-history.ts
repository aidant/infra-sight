import '../instrument.js'

import { createListHandler } from '../create-handler.js'
import { trace } from '../telemetry.js'

export const listOverwatchProfileHistory = trace(
  {
    name: 'InfraSight.function.listOverwatchProfileHistory',
    with: (event) => ({
      username: event.pathParameters?.['username'],
      page_token: event.queryStringParameters?.['page_token'],
    }),
  },
  createListHandler((event) => {
    const username = event.pathParameters?.['username'] as string

    return {
      path: `/overwatch/profiles/${Buffer.from(username, 'utf8').toString('hex')}/`,
    }
  })
)
