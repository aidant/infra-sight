import Joi from 'joi'
import { InfraSightTopHeroesSchema } from './infra-sight-top-heroes.js'

export const InfraSightTopHeroesListSchema = Joi.array().items(InfraSightTopHeroesSchema)
