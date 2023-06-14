import type { GetOverwatchPlayerIcons } from '@infra-sight/sdk'
import { overwatch } from '../overwatch.js'
import { parsePlayerIcons } from '../parsers/parse-player-icons.js'

export const getOverwatchPlayerIcons: GetOverwatchPlayerIcons =
  async function getOverwatchPlayerIcons() {
    const $ = await overwatch.html('./search')
    return parsePlayerIcons($)
  }
