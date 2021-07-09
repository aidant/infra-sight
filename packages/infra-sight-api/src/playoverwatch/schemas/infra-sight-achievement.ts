import { InfraSightAchievement } from '@infra-sight/sdk'
import Joi from 'joi'
import { InfraSightIDSchema } from './infra-sight-id.js'
import { OverwatchHeroSchema } from './overwatch-hero.js'

export const InfraSightAchievementSchema: Joi.ObjectSchema<InfraSightAchievement> = Joi.object({
  id: InfraSightIDSchema,
  category: Joi.string(),
  hero: Joi.when('category', {
    is: Joi.string().valid('Tank', 'Damage', 'Support'),
    then: OverwatchHeroSchema,
    otherwise: Joi.any().valid(null)
  }),
  name: Joi.string(),
  description: Joi.string(),
  unlocked: Joi.boolean(),
  url: Joi.string().uri(),
}).options({ presence: 'required' })
