import { InfraSightErrorWithTracing } from '../../error.js'
import { trace } from '../../telemetry.js'

export const parseNumber = trace(
  {
    name: 'InfraSight.parser.parseNumber',
    with: function (value: string) {
      return {
        'infra_sight.options.value': value,
        'infra_sight.result.number': this.result,
      }
    },
  },
  (value: string): number => {
    value = value.replace(/,/g, '')

    /*
      Parse a timestamp with format hh:mm:ss into a number representing seconds.
    */
    if (/^(?:\d+:)?\d+:\d+$/.test(value)) {
      const [seconds = 0, minutes = 0, hours = 0] = value.split(':').reverse().map(Number)
      return seconds + minutes * 60 + hours * 60 * 60
    }

    /*
      Parse a percentage into a zero to one fraction.
    */
    if (/^\d+(?:\.\d+)?%$/.test(value)) {
      return Number(value.replace('%', '')) / 100
    }

    /*
      Parse a number.
    */
    if (/^\d+(?:\.\d+)?$/.test(value)) {
      return Number(value)
    }

    throw new InfraSightErrorWithTracing<'OverwatchUnparsableContent'>(
      'Overwatch',
      'OverwatchUnparsableContent',
      `InfraSight was unable to parse the content from overwatch.blizzard.com while attempting to parse a number; please try again later or open an issue on InfraSight's GitHub repository if the problem persists.`,
      undefined
    )
  }
)
