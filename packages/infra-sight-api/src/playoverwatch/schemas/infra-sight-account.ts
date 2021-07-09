import { InfraSightAccount } from '@infra-sight/sdk'
import Joi from 'joi'
import { InfraSightPlatformSchema } from './infra-sight-platform.js'

export const InfraSightAccountSchema: Joi.ObjectSchema<InfraSightAccount> = Joi.object({
  name: Joi.string(),
  level: Joi.number(),
  portrait: Joi.string().uri(),
  is_public: Joi.boolean(),
  platform: InfraSightPlatformSchema,
  playoverwatch_url: Joi.string().uri(),
}).options({ presence: 'required' })
