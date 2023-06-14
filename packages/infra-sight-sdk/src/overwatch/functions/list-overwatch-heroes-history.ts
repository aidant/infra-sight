import { list } from '../../get.js'
import type { InfraSightAPI } from '../../infra-sight-api.js'
import type { InfraSightPaginationOptions } from '../types/infra-sight-pagination-options.js'

export type ListOverwatchHeroesHistory = (
  this: InfraSightAPI,
  options: InfraSightPaginationOptions
) => AsyncGenerator<string, void, never>

export const listOverwatchHeroesHistory: ListOverwatchHeroesHistory = ({ page_token }) => {
  return list('./v2/api/overwatch/heroes/history', { page_token })
}
