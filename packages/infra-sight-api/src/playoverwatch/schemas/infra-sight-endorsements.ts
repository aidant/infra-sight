import { InfraSightEndorsements } from '@infra-sight/sdk'
import Joi from 'joi'

export const InfraSightEndorsementsSchema: Joi.ObjectSchema<InfraSightEndorsements> = Joi.object({
  level: Joi.number().integer().min(1).max(5),
  percentages: Joi.object({
    shotcaller: Joi.number().min(0).max(1),
    good_teammate: Joi.number().min(0).max(1),
    sportsmanship: Joi.number().min(0).max(1),
  }),
}).options({ presence: 'required' })
