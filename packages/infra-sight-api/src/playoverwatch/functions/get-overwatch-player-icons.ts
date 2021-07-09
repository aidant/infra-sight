import { GetOverwatchPlayerIcons } from '@infra-sight/sdk'
import { parsePlayerIcons } from '../parsers/parse-player-icons.js'
import { playoverwatch } from '../playoverwatch.js'

export const getOverwatchPlayerIcons: GetOverwatchPlayerIcons = async function getOverwatchPlayerIcons () {
  const $ = await playoverwatch.html('./search')
  return parsePlayerIcons($)
}
