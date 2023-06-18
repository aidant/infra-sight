import '../instrumentation.js'

import { createListHandler } from '../create-handler.js'
import { traceEndpoint } from '../telemetry.js'

export const listOverwatchPlayerIconsHistory = traceEndpoint(
  {
    name: 'InfraSight.function.listOverwatchPlayerIconsHistory',
    with: (event) => ({
      page_token: event.queryStringParameters?.['page_token'],
    }),
  },
  createListHandler(() => {
    return {
      path: `/overwatch/player-icons/`,
    }
  })
)
