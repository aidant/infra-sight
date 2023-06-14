import type { InfraSightRank } from './infra-sight-rank.js'

export type InfraSightSkillRating = {
  tank: { rank: InfraSightRank; level: number } | null
  offense: { rank: InfraSightRank; level: number } | null
  support: { rank: InfraSightRank; level: number } | null
}
