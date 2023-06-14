import type { InfraSightEndorsements } from '@infra-sight/sdk'
import Joi from 'joi'

export const InfraSightEndorsementsSchema: Joi.ObjectSchema<InfraSightEndorsements> = Joi.object({
  level: Joi.number().integer().min(1).max(5).allow(null),
}).options({ presence: 'required' })
