import '../instrumentation.js'

import { createListHandler } from '../create-handler.js'
import { traceEndpoint } from '../telemetry.js'

export const listOverwatchProfileHistory = traceEndpoint(
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
