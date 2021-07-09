import { ErrorCode, InfraSightError } from '@infra-sight/sdk'

export const parseNumber = (value: string): number => {
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

  throw new InfraSightError(ErrorCode.PlayOverwatchUnparsableContent, {})
}