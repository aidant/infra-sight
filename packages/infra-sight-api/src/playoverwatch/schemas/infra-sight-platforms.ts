import { InfraSightPlatforms } from '@infra-sight/sdk'
import Joi from 'joi'
import { InfraSightPlatformSchema } from './infra-sight-platform.js'

export const InfraSightPlatformsSchema: Joi.ObjectSchema<InfraSightPlatforms> = Joi.object().pattern(InfraSightPlatformSchema, Joi.string().uri().allow(null))
