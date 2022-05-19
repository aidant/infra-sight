import { list } from '../../get.js'
import { InfraSightAPI } from '../../infra-sight-api.js'
import { InfraSightPaginationOptions } from '../types/infra-sight-pagination-options.js'

export type ListOverwatchAccountHistory = (
  this: InfraSightAPI,
  username: string,
  options: InfraSightPaginationOptions
) => AsyncGenerator<string, void, never>

export const listOverwatchAccountHistory: ListOverwatchAccountHistory = (
  username,
  { page_token }
) => {
  return list(
    `./v2/api/overwatch/accounts/${Buffer.from(username, 'utf8').toString('hex')}/history`,
    { page_token }
  )
}
