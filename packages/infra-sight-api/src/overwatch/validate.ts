import { InfraSightError } from '@infra-sight/sdk'
import Joi from 'joi'

export const validate = <T>(schema: Joi.Schema<T>, object: unknown): T => {
  const result = schema.validate(object)
  if (result.error) {
    throw new InfraSightError<'OverwatchUnparsableContent'>(
      'Overwatch',
      'OverwatchUnparsableContent',
      `InfraSight was unable to parse the content from overwatch.blizzard.com while attempting to parse "${
        schema.describe().label ?? '{unknown}'
      }"; please try again later or open an issue on InfraSight's GitHub repository if the problem persists.`,
      undefined
    )
  }
  return result.value
}
