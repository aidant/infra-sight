import Joi from 'joi'
import { OverwatchAccountSchema } from './overwatch-account.js'

export const OverwatchAccountListSchema = Joi.array().items(OverwatchAccountSchema)
