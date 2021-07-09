import Joi from 'joi'
import { OverwatchHeroSchema } from './overwatch-hero.js'

export const OverwatchHeroListSchema = Joi.array().items(OverwatchHeroSchema)