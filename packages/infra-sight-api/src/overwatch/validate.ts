import { reportError } from '@infra-sight/telemetry'
import Joi from 'joi'
import { InfraSightErrorWithTracing } from '../error.js'
import { trace } from '../telemetry.js'

export const validate = trace(
  {
    name: 'InfraSight.utility.validate',
    with: (schema) => ({
      'infra_sight.schema.label': schema.describe().label || '{unknown}',
    }),
  },
  <T>(schema: Joi.Schema<T>, object: unknown): T => {
    const result = schema.validate(object)

    if (result.error) {
      reportError(result.error)

      throw new InfraSightErrorWithTracing<'OverwatchUnparsableContent'>(
        'Overwatch',
        'OverwatchUnparsableContent',
        `InfraSight was unable to parse the content from overwatch.blizzard.com while attempting to parse "${
          schema.describe().label || '{unknown}'
        }"; please try again later or open an issue on InfraSight's GitHub repository if the problem persists.`,
        undefined
      )
    }

    return result.value
  }
)
