import { InfraSightTopHeroes } from '@infra-sight/sdk'
import Joi from 'joi'
import { OverwatchHeroSchema } from './overwatch-hero.js'

export const InfraSightTopHeroesSchema: Joi.ObjectSchema<InfraSightTopHeroes> = Joi.object({
  hero: OverwatchHeroSchema,
  value: Joi.number(),
}).options({ presence: 'required' })
