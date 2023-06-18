import '../instrument.js'

import * as api from '@infra-sight/api'
import * as sdk from '@infra-sight/sdk'
import { createScraperHandler } from '../create-handler.js'
import { trace } from '../telemetry.js'

export const getOverwatchHeroes = trace(
  {
    name: 'InfraSight.function.getOverwatchHeroes',
  },
  createScraperHandler(async () => {
    const payload = await api.getOverwatchHeroes.call(sdk)
    return {
      path: '/overwatch/heroes/',
      payload,
    }
  })
)
