import Joi from 'joi'

export const InfraSightIDSchema: Joi.StringSchema = Joi.string().regex(/^[a-z0-9_]+$/)
