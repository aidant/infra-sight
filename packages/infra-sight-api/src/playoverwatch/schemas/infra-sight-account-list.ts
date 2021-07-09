import Joi from 'joi'
import { InfraSightAccountSchema } from './infra-sight-account.js'

export const InfraSightAccountListSchema = Joi.array().items(InfraSightAccountSchema)
