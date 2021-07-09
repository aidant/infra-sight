import { InfraSightResolutionStrategy } from '@infra-sight/sdk'
import Joi from 'joi'

export const InfraSightResolutionStrategySchema = Joi.string().allow(
  ...Object.values(InfraSightResolutionStrategy)
)