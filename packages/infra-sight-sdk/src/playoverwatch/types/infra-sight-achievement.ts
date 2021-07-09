import { InfraSightID } from './infra-sight-id.js'
import { OverwatchHero } from './overwatch-hero.js'

export type InfraSightAchievement = {
  id: InfraSightID
  category: string
  hero: OverwatchHero | null
  name: string
  description: string
  unlocked: boolean
  url: string
}