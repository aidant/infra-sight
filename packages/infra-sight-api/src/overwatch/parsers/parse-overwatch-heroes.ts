import type { OverwatchHeroRecord } from '@infra-sight/sdk'
import type { CheerioAPI } from 'cheerio'
import { trace } from '../../telemetry.js'
import { sanitize } from '../sanitize.js'
import { OverwatchHeroRecordSchema } from '../schemas/overwatch-hero-record.js'
import { validate } from '../validate.js'

export const parseOverwatchHeroes = trace(
  {
    name: 'InfraSight.parser.parseOverwatchHeroes',
  },
  ($: CheerioAPI): OverwatchHeroRecord => {
    const heroes: OverwatchHeroRecord = {}

    $('blz-hero-card').each((i, e) => {
      const name = $(e).text()
      const id = sanitize(name)

      if (!id || !name) return

      heroes[id] = { id, name }
    })

    return validate<OverwatchHeroRecord>(OverwatchHeroRecordSchema, heroes)
  }
)
