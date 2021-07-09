import { InfraSightPlayerIcon } from '@infra-sight/sdk'
import Joi from 'joi'
import { OverwatchHeroSchema } from './overwatch-hero.js'

export const InfraSightPlayerIconSchema: Joi.ObjectSchema<InfraSightPlayerIcon> = Joi.object({
  url: Joi.string().uri(),
  name: Joi.string(),
  hero: OverwatchHeroSchema.allow(null),
  event: Joi.string()
}).options({ presence: 'required' })
