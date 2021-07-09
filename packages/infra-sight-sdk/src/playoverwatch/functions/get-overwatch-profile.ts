import { get } from '../../get.js'
import { InfraSightAPI } from '../../infra-sight-api.js'
import { InfraSightProfile } from '../types/infra-sight-profile.js'
import { GetOverwatchAccountOptions, validateGetOverwatchAccountOptions } from './get-overwatch-account.js'

export type GetOverwatchProfile = (this: InfraSightAPI, options: GetOverwatchAccountOptions) => Promise<InfraSightProfile>

export const getOverwatchProfile: GetOverwatchProfile = async ({ username, platform, resolution_strategy }) => {
  validateGetOverwatchAccountOptions({ username, platform, resolution_strategy })
  return get(`./v2/api/overwatch/profiles/${encodeURIComponent(username)}/latest`, { platform, resolution_strategy })
}
