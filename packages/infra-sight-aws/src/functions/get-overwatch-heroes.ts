import '../instrumentation.js'

import * as api from '@infra-sight/api'
import * as sdk from '@infra-sight/sdk'
import { createScraperHandler } from '../create-handler.js'
import { traceEndpoint } from '../telemetry.js'

export const getOverwatchHeroes = traceEndpoint(
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
