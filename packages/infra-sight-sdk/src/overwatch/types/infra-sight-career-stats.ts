import type { InfraSightID } from './infra-sight-id.js'
import type { OverwatchHero } from './overwatch-hero.js'

export type InfraSightCareerStats = {
  id: InfraSightID
  profile: string
  gamemode: string
  category: string
  hero: OverwatchHero | null
  stat: string
  value: number
}
