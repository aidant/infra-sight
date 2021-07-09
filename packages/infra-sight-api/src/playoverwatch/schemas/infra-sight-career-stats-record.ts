import { InfraSightCareerStatsRecord } from '@infra-sight/sdk'
import Joi from 'joi'
import { InfraSightCareerStatsSchema } from './infra-sight-career-stats.js'
import { InfraSightIDSchema } from './infra-sight-id.js'

export const InfraSightCareerStatsRecordSchema: Joi.ObjectSchema<InfraSightCareerStatsRecord> = Joi.object().pattern(InfraSightIDSchema, InfraSightCareerStatsSchema)
