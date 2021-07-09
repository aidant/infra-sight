import { get } from '../../get.js'
import { InfraSightAPI } from '../../infra-sight-api.js'
import { OverwatchHeroList } from '../types/overwatch-hero-list.js'

export type GetOverwatchHeroes = (this: InfraSightAPI) => Promise<OverwatchHeroList>

export const getOverwatchHeroes: GetOverwatchHeroes = async () => {
  return get('./v2/api/overwatch/heroes/latest')
}