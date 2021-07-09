import { InfraSightTopHeroesRecord } from '@infra-sight/sdk'
import Joi from 'joi'
import { InfraSightIDSchema } from './infra-sight-id.js'
import { InfraSightTopHeroesListSchema } from './infra-sight-top-heroes-list.js'

export const InfraSightTopHeroesRecordSchema: Joi.ObjectSchema<InfraSightTopHeroesRecord> = Joi.object().pattern(InfraSightIDSchema, Joi.object({
  id: InfraSightIDSchema,
  gamemode: Joi.string(),
  category: Joi.string(),
  top_heroes: InfraSightTopHeroesListSchema
}).options({ presence: 'required' }))
