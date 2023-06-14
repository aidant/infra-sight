import type { OverwatchHero } from './overwatch-hero.js'

export type OverwatchHeroRecord = Record<OverwatchHero, { id: OverwatchHero; name: string }>
