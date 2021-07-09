import { InfraSightCareerStats } from '@infra-sight/sdk'
import Joi from 'joi'
import { InfraSightIDSchema } from './infra-sight-id.js'
import { OverwatchHeroSchema } from './overwatch-hero.js'

export const InfraSightCareerStatsSchema: Joi.ObjectSchema<InfraSightCareerStats> = Joi.object({
  id: InfraSightIDSchema,
  gamemode: Joi.string(),
  category: Joi.string(),
  hero: OverwatchHeroSchema.allow(null),
  stat: Joi.string(),
  value: Joi.number(),
}).options({ presence: 'required' })
