import { InfraSightID } from './infra-sight-id.js'
import { OverwatchHero } from './overwatch-hero.js'

export type InfraSightCareerStats = {
  id: InfraSightID
  gamemode: string
  category: string
  hero: OverwatchHero | null
  stat: string
  value: number
}