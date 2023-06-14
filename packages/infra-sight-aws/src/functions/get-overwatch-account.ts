import * as api from '@infra-sight/api'
import type { InfraSightResolutionStrategies } from '@infra-sight/sdk'
import * as sdk from '@infra-sight/sdk'
import { createScraperHandler } from '../create-handler.js'

export const getOverwatchAccount = createScraperHandler(async (event) => {
  const username = event.pathParameters?.['username'] as string
  const resolution_strategy = event.queryStringParameters?.['resolution_strategy']?.split(
    ','
  ) as InfraSightResolutionStrategies

  const payload = await api.getOverwatchAccount.call(sdk, {
    username,
    resolution_strategy,
  })

  return {
    path: `/overwatch/accounts/${Buffer.from(payload.name, 'utf8').toString('hex')}/`,
    payload: payload,
    cache: 3600,
  }
})
