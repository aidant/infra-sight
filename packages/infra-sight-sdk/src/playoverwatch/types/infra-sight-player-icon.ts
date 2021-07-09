import { OverwatchHero } from './overwatch-hero.js'

export interface InfraSightPlayerIcon {
  url: string
  name: string
  hero: OverwatchHero | null
  event: string
}