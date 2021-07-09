import { InfraSightAchievementRecord } from '@infra-sight/sdk'
import Joi from 'joi'
import { InfraSightAchievementSchema } from './infra-sight-achievement.js'
import { InfraSightIDSchema } from './infra-sight-id.js'

export const InfraSightAchievementRecordSchema: Joi.ObjectSchema<InfraSightAchievementRecord> = Joi.object().pattern(InfraSightIDSchema, InfraSightAchievementSchema)
