import { get } from '../../get.js'
import type { InfraSightAPI } from '../../infra-sight-api.js'
import type { InfraSightProfile } from '../types/infra-sight-profile.js'
import {
  validateGetOverwatchAccountOptions,
  type GetOverwatchAccountOptions,
} from './get-overwatch-account.js'

export type GetOverwatchProfile = (
  this: InfraSightAPI,
  options: GetOverwatchAccountOptions
) => Promise<InfraSightProfile>

export const getOverwatchProfile: GetOverwatchProfile = async ({
  username,
  resolution_strategy,
}) => {
  validateGetOverwatchAccountOptions({
    username,
    resolution_strategy,
  })
  return get(`./v2/api/overwatch/profiles/${encodeURIComponent(username)}/latest`, {
    resolution_strategy,
  })
}
