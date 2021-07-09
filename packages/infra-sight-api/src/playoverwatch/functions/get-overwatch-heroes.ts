import { GetOverwatchHeroes } from '@infra-sight/sdk'
import { parseOverwatchHeroes } from '../parsers/parse-overwatch-heroes.js'
import { playoverwatch } from '../playoverwatch.js'

export const getOverwatchHeroes: GetOverwatchHeroes = async function getOverwatchHeroes () {
  const $ = await playoverwatch.html('./heroes')
  return parseOverwatchHeroes($)
}