import { InfraSightPlayerIconRecord } from '@infra-sight/sdk'
import Joi from 'joi'
import { InfraSightPlayerIconSchema } from './infra-sight-player-icon.js'
import { OverwatchIDSchema } from './overwatch-id.js'

export const InfraSightPlayerIconRecordSchema : Joi.ObjectSchema<InfraSightPlayerIconRecord> = Joi.object().pattern(OverwatchIDSchema, InfraSightPlayerIconSchema)
