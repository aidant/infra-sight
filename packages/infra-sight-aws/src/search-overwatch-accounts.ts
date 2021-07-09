import * as api from '@infra-sight/api'
import * as sdk from '@infra-sight/sdk'
import { createScraperHandler } from './create-handler'

export const searchOverwatchAccounts = createScraperHandler(
  async (event) => {
    const username = event.pathParameters?.username as string

    const payload = await api.searchOverwatchAccounts.call(sdk, { username })
    return {
      path: '/overwatch/search/accounts/',
      payload,
      cache: 3600
    }
  }
)
