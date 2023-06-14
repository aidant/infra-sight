import type { InfraSightSkillRating } from '@infra-sight/sdk'
import Joi from 'joi'
import { InfraSightRankSchema } from './infra-sight-rank.js'

export const InfraSightSkillRatingSchema: Joi.ObjectSchema<InfraSightSkillRating> = Joi.object({
  tank: Joi.object({
    rank: InfraSightRankSchema,
    level: Joi.number().integer().min(1).max(5),
  }).allow(null),
  offense: Joi.object({
    rank: InfraSightRankSchema,
    level: Joi.number().integer().min(1).max(5),
  }).allow(null),
  support: Joi.object({
    rank: InfraSightRankSchema,
    level: Joi.number().integer().min(1).max(5),
  }).allow(null),
}).options({ presence: 'required' })
