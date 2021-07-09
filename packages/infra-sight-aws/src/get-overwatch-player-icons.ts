import * as api from '@infra-sight/api'
import * as sdk from '@infra-sight/sdk'
import { createScraperHandler } from './create-handler'

export const getOverwatchPlayerIcons = createScraperHandler(
  async () => {
    const payload = await api.getOverwatchPlayerIcons.call(sdk)
    return {
      path: '/overwatch/player-icons/',
      payload
    }
  }
)
