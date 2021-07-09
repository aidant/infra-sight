import { get } from '../../get.js'
import { InfraSightAPI } from '../../infra-sight-api.js'
import { InfraSightPlayerIconRecord } from '../types/infra-sight-player-icon-record.js'

export type GetOverwatchPlayerIcons = (this: InfraSightAPI) => Promise<InfraSightPlayerIconRecord>

export const getOverwatchPlayerIcons: GetOverwatchPlayerIcons = async () => {
  return get('./v2/api/overwatch/player-icons/latest')
}