import { createListHandler } from '../create-handler.js'
import { trace } from '../telemetry.js'

export const listOverwatchPlayerIconsHistory = trace(
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
