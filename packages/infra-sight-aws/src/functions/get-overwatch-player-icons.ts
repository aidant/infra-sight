import '../instrumentation.js'

import * as api from '@infra-sight/api'
import * as sdk from '@infra-sight/sdk'
import { createScraperHandler } from '../create-handler.js'
import { traceEndpoint } from '../telemetry.js'

export const getOverwatchPlayerIcons = traceEndpoint(
  {
    name: 'InfraSight.function.getOverwatchPlayerIcons',
  },
  createScraperHandler(async () => {
    const payload = await api.getOverwatchPlayerIcons.call(sdk)
    return {
      path: '/overwatch/player-icons/',
      payload,
    }
  })
)
