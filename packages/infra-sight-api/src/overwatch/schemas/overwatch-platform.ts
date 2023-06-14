import Joi from 'joi'

export const OverwatchPlatformSchema = Joi.string().valid('pc', 'xbl', 'psn', 'nintendo-switch')
