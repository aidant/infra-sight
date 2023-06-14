import type { OverwatchAccount } from '@infra-sight/sdk'
import Joi from 'joi'
import { OverwatchIDSchema } from './overwatch-id.js'

export const OverwatchAccountSchema: Joi.ObjectSchema<OverwatchAccount> = Joi.object({
  battleTag: Joi.string(),
  frame: OverwatchIDSchema,
  isPublic: Joi.boolean(),
  lastUpdated: Joi.number(),
  namecard: OverwatchIDSchema.optional(),
  portrait: OverwatchIDSchema,
  title: OverwatchIDSchema.optional(),
}).options({ presence: 'required' })
