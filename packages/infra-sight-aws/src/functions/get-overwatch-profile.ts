import '../instrument.js'

import * as api from '@infra-sight/api'
import type { InfraSightResolutionStrategies } from '@infra-sight/sdk'
import * as sdk from '@infra-sight/sdk'
import { createScraperHandler } from '../create-handler.js'
import { trace } from '../telemetry.js'

export const getOverwatchProfile = trace(
  {
    name: 'InfraSight.function.getOverwatchProfile',
    with: (event) => ({
      username: event.pathParameters?.['username'],
      resolution_strategy: event.queryStringParameters?.['resolution_strategy']?.split(','),
    }),
  },
  createScraperHandler(async (event) => {
    const username = event.pathParameters?.['username'] as string
    const resolution_strategy = event.queryStringParameters?.['resolution_strategy']?.split(
      ','
    ) as InfraSightResolutionStrategies

    const payload = await api.getOverwatchProfile.call(sdk, {
      username,
      resolution_strategy,
    })

    return {
      path: `/overwatch/profiles/${Buffer.from(payload.account.name, 'utf8').toString('hex')}/`,
      payload,
      cache: 3600,
    }
  })
)
