import type { GetOverwatchPlayerIcons } from '@infra-sight/sdk'
import { trace } from '../../telemetry.js'
import { getOverwatchHTML } from '../overwatch.js'
import { parsePlayerIcons } from '../parsers/parse-player-icons.js'

export const getOverwatchPlayerIcons = trace<GetOverwatchPlayerIcons>(
  { name: 'InfraSight.function.getOverwatchPlayerIcons' },
  async function getOverwatchPlayerIcons() {
    const $ = await getOverwatchHTML('./search')
    return parsePlayerIcons($)
  }
)
