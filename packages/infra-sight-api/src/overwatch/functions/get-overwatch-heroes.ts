import type { GetOverwatchHeroes } from '@infra-sight/sdk'
import { trace } from '../../telemetry.js'
import { getOverwatchHTML } from '../overwatch.js'
import { parseOverwatchHeroes } from '../parsers/parse-overwatch-heroes.js'

export const getOverwatchHeroes = trace<GetOverwatchHeroes>(
  {
    name: 'InfraSight.function.getOverwatchHeroes',
  },
  async function getOverwatchHeroes() {
    const $ = await getOverwatchHTML('./heroes')
    return parseOverwatchHeroes($)
  }
)
