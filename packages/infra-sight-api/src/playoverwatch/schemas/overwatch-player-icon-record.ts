import { OverwatchPlayerIconRecord } from '@infra-sight/sdk'
import Joi from 'joi'
import { OverwatchIDSchema } from './overwatch-id.js'
import { OverwatchPlayerIconSchema } from './overwatch-player-icon.js'

export const OverwatchPlayerIconRecordSchema: Joi.ObjectSchema<OverwatchPlayerIconRecord> = Joi.object().pattern(OverwatchIDSchema, OverwatchPlayerIconSchema)
