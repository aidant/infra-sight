import Joi from 'joi'
import { InfraSightResolutionStrategySchema } from './infra-sight-resolution-strategy.js'

export const InfraSightResolutionStrategiesSchema = Joi.array().allow(
  InfraSightResolutionStrategySchema
)