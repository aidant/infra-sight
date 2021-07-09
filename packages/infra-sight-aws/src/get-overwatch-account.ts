import * as api from '@infra-sight/api'
import * as sdk from '@infra-sight/sdk'
import { InfraSightPlatform, InfraSightResolutionStrategies } from '@infra-sight/sdk'
import { createScraperHandler } from './create-handler'

export const getOverwatchAccount = createScraperHandler(
  async (event) => {
    const username = event.pathParameters?.username as string
    const platform = event.queryStringParameters?.platform as InfraSightPlatform
    const resolution_strategy = event.queryStringParameters?.resolution_strategy?.split(',') as InfraSightResolutionStrategies

    const payload = await api.getOverwatchAccount.call(sdk, { username, platform, resolution_strategy })

    return {
      path: `/overwatch/accounts/${Buffer.from(payload.name, 'utf8').toString('hex')}/`,
      payload: payload,
      cache: 3600
    }
  }
)
