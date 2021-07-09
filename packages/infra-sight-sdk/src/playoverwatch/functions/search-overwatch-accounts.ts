import { ErrorCode, InfraSightError } from '../../errors.js'
import { get } from '../../get.js'
import { InfraSightAPI } from '../../infra-sight-api.js'
import { InfraSightAccountList } from '../types/infra-sight-account-list.js'

export interface SearchOverwatchAccountsOptions {
  username: string
}

export function validateSearchOverwatchAccountsOptions (options: SearchOverwatchAccountsOptions): asserts options is SearchOverwatchAccountsOptions {
  if (typeof options?.username !== 'string') {
    throw new InfraSightError(ErrorCode.InfraSightInvalidOptions, { options: ['username'] })
  }
}

export type SearchOverwatchAccounts = (this: InfraSightAPI, options: SearchOverwatchAccountsOptions) => Promise<InfraSightAccountList>

export const searchOverwatchAccounts: SearchOverwatchAccounts = async ({ username }) => {
  validateSearchOverwatchAccountsOptions({ username })
  return get(`./v2/api/overwatch/accounts/${encodeURIComponent(username)}/search`)
}