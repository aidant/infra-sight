import type { InfraSightPlayerIconRecord, OverwatchPlayerIconRecord } from '@infra-sight/sdk'
import type { CheerioAPI } from 'cheerio'
import { trace } from '../../telemetry.js'
import { InfraSightPlayerIconRecordSchema } from '../schemas/infra-sight-player-icon-record.js'
import { OverwatchPlayerIconRecordSchema } from '../schemas/overwatch-player-icon-record.js'
import { validate } from '../validate.js'

export const parsePlayerIcons = trace(
  {
    name: 'InfraSight.parser.parsePlayerIcons',
  },
  ($: CheerioAPI): InfraSightPlayerIconRecord => {
    const script = $('script:contains("const avatars")').html() as string
    const constants: Record<'avatars' | 'namecards' | 'titles', any> = Object.fromEntries(
      script
        .split(/\r?\n/)
        .map((line) => line.trim().match(/^const (?<property>[^ ]+) = (?<value>.+)$/)?.groups)
        .filter(
          (match): match is { property: string; value: string } =>
            !!match && !!match['property'] && !!match['value']
        )
        .map((match) => [match.property, JSON.parse(match.value)])
    ) as any

    const overwatchPlayerIcons = validate<OverwatchPlayerIconRecord>(
      OverwatchPlayerIconRecordSchema,
      constants.avatars
    )

    const playerIcons: InfraSightPlayerIconRecord = {}
    for (const id of Object.keys(overwatchPlayerIcons).sort()) {
      const overwatchPlayerIcon = overwatchPlayerIcons[id]
      if (overwatchPlayerIcon) {
        playerIcons[id] = {
          url: overwatchPlayerIcon.icon,
          name: overwatchPlayerIcon.name,
          hero: overwatchPlayerIcon.hero.name,
          event: overwatchPlayerIcon.event.name,
        }
      }
    }

    return validate<InfraSightPlayerIconRecord>(InfraSightPlayerIconRecordSchema, playerIcons)
  }
)
