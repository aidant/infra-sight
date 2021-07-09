import { ErrorCode, InfraSightError } from '@infra-sight/sdk'
import Joi from 'joi'

export const validate = <T>(schema: Joi.Schema<T>, object: unknown): T => {
  const result = schema.validate(object)
  if (result.error) {
    console.error(result)
    throw new InfraSightError(ErrorCode.PlayOverwatchUnparsableContent, {})
  }
  return result.value
}
