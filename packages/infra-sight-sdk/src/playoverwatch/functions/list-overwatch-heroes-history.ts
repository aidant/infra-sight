import { list } from '../../get.js'
import { InfraSightAPI } from '../../infra-sight-api.js'
import { InfraSightPaginationOptions } from '../types/infra-sight-pagination-options.js'

export type ListOverwatchHeroesHistory = (this: InfraSightAPI, options: InfraSightPaginationOptions) => AsyncGenerator<string, void, never>

export const listOverwatchHeroesHistory: ListOverwatchHeroesHistory = ({ page_token }) => {
  return list('./v2/api/overwatch/heroes/history', { page_token })
}