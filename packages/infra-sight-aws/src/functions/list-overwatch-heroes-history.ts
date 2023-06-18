import { createListHandler } from '../create-handler.js'
import { trace } from '../telemetry.js'

export const listOverwatchHeroesHistory = trace(
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
