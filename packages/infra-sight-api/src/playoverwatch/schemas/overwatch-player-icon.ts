import { OverwatchPlayerIcon } from '@infra-sight/sdk'
import Joi from 'joi'
import { OverwatchHeroSchema } from './overwatch-hero.js'

export const OverwatchPlayerIconSchema: Joi.ObjectSchema<OverwatchPlayerIcon> = Joi.object({
  name: Joi.string(),
  hero: {
    name: OverwatchHeroSchema.allow(null),
  },
  event: {
    name: Joi.string(),
  },
  icon: Joi.string()
}).options({ presence: 'required', stripUnknown: true })
