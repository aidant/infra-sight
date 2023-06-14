import type { InfraSightAccount } from '@infra-sight/sdk'
import Joi from 'joi'

export const InfraSightAccountSchema: Joi.ObjectSchema<InfraSightAccount> = Joi.object({
  name: Joi.string(),
  portrait: Joi.string().uri().allow(null),
  is_public: Joi.boolean(),
  overwatch_url: Joi.string().uri(),
}).options({ presence: 'required' })
