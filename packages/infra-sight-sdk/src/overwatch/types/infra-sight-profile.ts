import type { InfraSightAccount } from './infra-sight-account.js'
import type { InfraSightCareerStatsRecord } from './infra-sight-career-stats-record.js'
import type { InfraSightEndorsements } from './infra-sight-endorsements.js'
import type { InfraSightSkillRating } from './infra-sight-skill-rating.js'
import type { InfraSightTopHeroesRecord } from './infra-sight-top-heroes-record.js'

export interface InfraSightProfile {
  account: InfraSightAccount
  career_stats: InfraSightCareerStatsRecord
  endorsements: InfraSightEndorsements
  skill_rating: InfraSightSkillRating
  top_heroes: InfraSightTopHeroesRecord
}
