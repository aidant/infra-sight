import { OverwatchAccount } from '@infra-sight/sdk'
import Joi from 'joi'
import { OverwatchIDSchema } from './overwatch-id.js'
import { OverwatchPlatformSchema } from './overwatch-platform.js'

export const OverwatchAccountSchema: Joi.ObjectSchema<OverwatchAccount> = Joi.object({
  name: Joi.string(),
  urlName: Joi.string(),
  id: Joi.number(),
  level: Joi.number(),
  playerLevel: Joi.number(),
  isPublic: Joi.boolean(),
  platform: OverwatchPlatformSchema,
  portrait: OverwatchIDSchema
}).options({ presence: 'required' })