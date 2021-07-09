import Joi from 'joi'

export const OverwatchIDSchema = Joi.string().regex(/0x[0-9A-F]{16}/i)