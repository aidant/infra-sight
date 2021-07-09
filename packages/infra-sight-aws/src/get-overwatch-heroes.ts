import * as api from '@infra-sight/api'
import * as sdk from '@infra-sight/sdk'
import { createScraperHandler } from './create-handler'

export const getOverwatchHeroes = createScraperHandler(
  async () => {
    const payload = await api.getOverwatchHeroes.call(sdk)
    return {
      path: '/overwatch/heroes/',
      payload
    }
  }
)
