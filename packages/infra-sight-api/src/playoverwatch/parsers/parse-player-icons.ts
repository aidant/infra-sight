import { InfraSightPlayerIconRecord, OverwatchPlayerIconRecord } from '@infra-sight/sdk'
import { CheerioAPI } from 'cheerio'
import { InfraSightPlayerIconRecordSchema } from '../schemas/infra-sight-player-icon-record.js'
import { OverwatchPlayerIconRecordSchema } from '../schemas/overwatch-player-icon-record.js'
import { validate } from '../validate.js'

export const parsePlayerIcons = ($: CheerioAPI): InfraSightPlayerIconRecord => {
  const script = $('body > script:contains("window.app.search.init")').html() as string
  const json = script.substring(script.indexOf('{'), script.lastIndexOf('}') + 1)
  const object = JSON.parse(json)
  const overwatchPlayerIcons = validate<OverwatchPlayerIconRecord>(OverwatchPlayerIconRecordSchema, object)

  const playerIcons: InfraSightPlayerIconRecord = {}
  for (const id of Object.keys(overwatchPlayerIcons).sort()) {
    playerIcons[id] = {
      url: overwatchPlayerIcons[id].icon,
      name: overwatchPlayerIcons[id].name,
      hero: overwatchPlayerIcons[id].hero.name,
      event: overwatchPlayerIcons[id].event.name
    }
  }

  return validate<InfraSightPlayerIconRecord>(InfraSightPlayerIconRecordSchema, playerIcons)
}