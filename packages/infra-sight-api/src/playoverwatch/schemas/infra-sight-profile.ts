import { InfraSightProfile } from '@infra-sight/sdk'
import Joi from 'joi'
import { InfraSightAccountSchema } from './infra-sight-account.js'
import { InfraSightAchievementRecordSchema } from './infra-sight-achievement-record.js'
import { InfraSightCareerStatsRecordSchema } from './infra-sight-career-stats-record.js'
import { InfraSightEndorsementsSchema } from './infra-sight-endorsements.js'
import { InfraSightPlatformsSchema } from './infra-sight-platforms.js'
import { InfraSightSkillRatingSchema } from './infra-sight-skill-rating.js'
import { InfraSightTopHeroesRecordSchema } from './infra-sight-top-heroes-record.js'

export const InfraSightProfileSchema: Joi.ObjectSchema<InfraSightProfile> = Joi.object({
  account: InfraSightAccountSchema,
  achievements: InfraSightAchievementRecordSchema,
  career_stats: InfraSightCareerStatsRecordSchema,
  endorsements: InfraSightEndorsementsSchema,
  platforms: InfraSightPlatformsSchema,
  skill_rating: InfraSightSkillRatingSchema,
  top_heroes: InfraSightTopHeroesRecordSchema,
})
