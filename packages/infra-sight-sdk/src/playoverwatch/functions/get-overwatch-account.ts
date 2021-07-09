import { ErrorCode, InfraSightError } from '../../errors.js'
import { get } from '../../get.js'
import { InfraSightAPI } from '../../infra-sight-api.js'
import { InfraSightAccount } from '../types/infra-sight-account.js'
import { InfraSightPlatform } from '../types/infra-sight-platform.js'
import { InfraSightResolutionStrategies } from '../types/infra-sight-resolution-strategies.js'
import { InfraSightResolutionStrategy } from '../types/infra-sight-resolution-strategy.js'

export interface GetOverwatchAccountOptions {
  username: string
  platform?: InfraSightPlatform
  resolution_strategy?: InfraSightResolutionStrategies
}

export function validateGetOverwatchAccountOptions (options: GetOverwatchAccountOptions): asserts options is GetOverwatchAccountOptions {
  const errors: string[] = []

  const platforms = Object.values(InfraSightPlatform)
  const resolution_strategy = Object.values(InfraSightResolutionStrategy)

  if (typeof options?.username !== 'string') {
    errors.push('username')
  }

  if (options?.platform && !platforms.includes(options.platform)) {
    errors.push('platform')
  }

  if (options?.resolution_strategy?.length && options.resolution_strategy.some(strategy => strategy && !resolution_strategy.includes(strategy))) {
    errors.push('resolution_strategy') 
  }

  if (errors.length) {
    throw new InfraSightError(ErrorCode.InfraSightInvalidOptions, { options: errors })
  }
}

export type GetOverwatchAccount = (this: InfraSightAPI, options: GetOverwatchAccountOptions) => Promise<InfraSightAccount>

export const getOverwatchAccount: GetOverwatchAccount = async ({ username, platform, resolution_strategy }) => {
  validateGetOverwatchAccountOptions({ username, platform, resolution_strategy })
  return get(`./v2/api/overwatch/accounts/${encodeURIComponent(username)}/latest`, { platform, resolution_strategy })
}