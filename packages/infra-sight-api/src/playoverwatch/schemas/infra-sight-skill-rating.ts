import { InfraSightSkillRating } from '@infra-sight/sdk'
import Joi from 'joi'

export const InfraSightSkillRatingSchema: Joi.ObjectSchema<InfraSightSkillRating> = Joi.object({
  tank: Joi.number().min(0).max(5000).allow(null),
  damage: Joi.number().min(0).max(5000).allow(null),
  support: Joi.number().min(0).max(5000).allow(null),
}).options({ presence: 'required' })
