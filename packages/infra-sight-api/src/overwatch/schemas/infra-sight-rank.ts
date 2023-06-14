import { InfraSightRank } from '@infra-sight/sdk'
import Joi from 'joi'

export const InfraSightRankSchema: Joi.StringSchema<InfraSightRank> =
  Joi.string<InfraSightRank>().valid(...Object.values(InfraSightRank))
