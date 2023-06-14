import type { GetOverwatchHeroes } from '@infra-sight/sdk'
import { overwatch } from '../overwatch.js'
import { parseOverwatchHeroes } from '../parsers/parse-overwatch-heroes.js'

export const getOverwatchHeroes: GetOverwatchHeroes = async function getOverwatchHeroes() {
  const $ = await overwatch.html('./heroes')
  return parseOverwatchHeroes($)
}
