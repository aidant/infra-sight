import { InfraSightError } from '../../error.js'
import { get } from '../../get.js'
import type { InfraSightAPI } from '../../infra-sight-api.js'
import type { InfraSightAccountList } from '../types/infra-sight-account-list.js'

export interface SearchOverwatchAccountsOptions {
  username: string
}

export function validateSearchOverwatchAccountsOptions(
  this: { InfraSightError: typeof InfraSightError },
  options: SearchOverwatchAccountsOptions
): asserts options is SearchOverwatchAccountsOptions {
  if (typeof options?.username !== 'string') {
    throw new this.InfraSightError<'ConsumerInvalidOptions'>(
      'Consumer',
      'ConsumerInvalidOptions',
      `InfraSight is unable to search for an account without a username, please provide a valid option for "username" and try again.`,
      {
        options: ['username'],
      }
    )
  }
}

export type SearchOverwatchAccounts = (
  this: InfraSightAPI,
  options: SearchOverwatchAccountsOptions
) => Promise<InfraSightAccountList>

export const searchOverwatchAccounts: SearchOverwatchAccounts = async ({ username }) => {
  validateSearchOverwatchAccountsOptions.call({ InfraSightError }, { username })
  return get(`./v2/api/overwatch/accounts/${encodeURIComponent(username)}/search`)
}
