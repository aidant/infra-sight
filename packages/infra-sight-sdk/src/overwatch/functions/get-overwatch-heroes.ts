import { get } from '../../get.js'
import type { InfraSightAPI } from '../../infra-sight-api.js'
import type { OverwatchHeroRecord } from '../types/overwatch-hero-record.js'

export type GetOverwatchHeroes = (this: InfraSightAPI) => Promise<OverwatchHeroRecord>

export const getOverwatchHeroes: GetOverwatchHeroes = async () => {
  return get('./v2/api/overwatch/heroes/latest')
}
