import '../instrument.js'

import * as api from '@infra-sight/api'
import * as sdk from '@infra-sight/sdk'
import { createScraperHandler } from '../create-handler.js'
import { trace } from '../telemetry.js'

export const getOverwatchPlayerIcons = trace(
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
