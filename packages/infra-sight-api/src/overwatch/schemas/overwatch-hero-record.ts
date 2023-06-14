import Joi from 'joi'
import { OverwatchHeroSchema } from './overwatch-hero.js'

export const OverwatchHeroRecordSchema = Joi.object().pattern(
  OverwatchHeroSchema,
  Joi.object({
    id: OverwatchHeroSchema,
    name: Joi.string(),
  }).options({ presence: 'required' })
)
