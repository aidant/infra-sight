import { InfraSightError } from '../../error.js'
import { get } from '../../get.js'
import type { InfraSightAPI } from '../../infra-sight-api.js'
import type { InfraSightAccount } from '../types/infra-sight-account.js'
import type { InfraSightResolutionStrategies } from '../types/infra-sight-resolution-strategies.js'
import { InfraSightResolutionStrategy } from '../types/infra-sight-resolution-strategy.js'

export interface GetOverwatchAccountOptions {
  username: string
  resolution_strategy?: InfraSightResolutionStrategies | undefined
}

export function validateGetOverwatchAccountOptions(
  this: { InfraSightError: typeof InfraSightError },
  options: GetOverwatchAccountOptions
): asserts options is GetOverwatchAccountOptions {
  const errors: { option: string; message: string }[] = []

  const resolution_strategy = Object.values(InfraSightResolutionStrategy)

  if (typeof options?.username !== 'string') {
    errors.push({ option: 'username', message: 'without a username' })
  }

  if (
    options?.resolution_strategy?.length &&
    options.resolution_strategy.some(
      (strategy) => strategy && !resolution_strategy.includes(strategy)
    )
  ) {
    errors.push({ option: 'resolution_strategy', message: 'with an invalid resolution_strategy' })
  }

  if (errors.length) {
    throw new this.InfraSightError<'ConsumerInvalidOptions'>(
      'Consumer',
      'ConsumerInvalidOptions',
      `InfraSight is unable to get an account ${errors
        .map((error) => error.message)
        .join(' and ')}, please provide a valid option for "${errors
        .map((error) => error.option)
        .join('" and "')}" and try again.`,
      {
        options: errors.map((error) => error.option),
      }
    )
  }
}

export type GetOverwatchAccount = (
  this: InfraSightAPI,
  options: GetOverwatchAccountOptions
) => Promise<InfraSightAccount>

export const getOverwatchAccount: GetOverwatchAccount = async ({
  username,
  resolution_strategy,
}) => {
  validateGetOverwatchAccountOptions.call(
    { InfraSightError },
    {
      username,
      resolution_strategy,
    }
  )
  return get(`./v2/api/overwatch/accounts/${encodeURIComponent(username)}/latest`, {
    resolution_strategy,
  })
}
