import '../instrumentation.js'

import { createListHandler } from '../create-handler.js'
import { traceEndpoint } from '../telemetry.js'

export const listOverwatchHeroesHistory = traceEndpoint(
  {
    name: 'InfraSight.function.listOverwatchHeroesHistory',
    with: (event) => ({
      page_token: event.queryStringParameters?.['page_token'],
    }),
  },
  createListHandler(() => {
    return {
      path: `/overwatch/heroes/`,
    }
  })
)
