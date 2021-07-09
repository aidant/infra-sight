import { InfraSightAccount } from './infra-sight-account.js'
import { InfraSightAchievementRecord } from './infra-sight-achievement-record.js'
import { InfraSightCareerStatsRecord } from './infra-sight-career-stats-record.js'
import { InfraSightEndorsements } from './infra-sight-endorsements.js'
import { InfraSightPlatforms } from './infra-sight-platforms.js'
import { InfraSightSkillRating } from './infra-sight-skill-rating.js'
import { InfraSightTopHeroesRecord } from './infra-sight-top-heroes-record.js'

export interface InfraSightProfile {
  account: InfraSightAccount
  achievements: InfraSightAchievementRecord
  career_stats: InfraSightCareerStatsRecord
  endorsements: InfraSightEndorsements
  platforms: InfraSightPlatforms
  skill_rating: InfraSightSkillRating
  top_heroes: InfraSightTopHeroesRecord
}