import { InfraSightPlatform } from '@infra-sight/sdk'
import Joi from 'joi'

export const InfraSightPlatformSchema = Joi.string().valid(
  ...Object.values(InfraSightPlatform)
)
