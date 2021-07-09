import { list } from '../../get.js'
import { InfraSightAPI } from '../../infra-sight-api.js'
import { InfraSightPaginationOptions } from '../types/infra-sight-pagination-options.js'

export type ListOverwatchPlayerIconsHistory = (this: InfraSightAPI, options: InfraSightPaginationOptions) => AsyncGenerator<string, void, never>

export const listOverwatchPlayerIconsHistory: ListOverwatchPlayerIconsHistory = ({ page_token }) => {
  return list('./v2/api/overwatch/player-icons/history', { page_token })
}