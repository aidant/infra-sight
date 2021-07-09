import { InfraSightTopHeroesRecord } from '@infra-sight/sdk'
import { CheerioAPI } from 'cheerio'
import { sanitize } from '../sanitize.js'
import { InfraSightTopHeroesRecordSchema } from '../schemas/infra-sight-top-heroes-record.js'
import { validate } from '../validate.js'
import { parseDropdown } from './parse-dropdown.js'
import { parseGamemodes } from './parse-gamemodes.js'
import { parseNumber } from './parse-number.js'

export const parseTopHeroes = ($: CheerioAPI): InfraSightTopHeroesRecord => {
  const gamemodes = parseGamemodes($)
  const categories = parseDropdown($, '[data-js="career-category"] select[data-group-id="comparisons"] option')

  const topHeroesRecord: InfraSightTopHeroesRecord = {}
  $('[data-js="career-category"] [data-js="progressBar"]').each((i, e) => {
    const element = $(e)

    const categoryNumber = element.parent().attr()['data-category-id']
    const category = categories[categoryNumber]
    const categoryId = sanitize(category)
    const gamemodeId = element.parents('[data-js="career-category"]').attr()['data-mode']
    
    const id = [gamemodeId, categoryId].join('__')
    const gamemode = gamemodes[gamemodeId]
    const hero = $('.ProgressBar-title', e).text()
    const value = parseNumber($('.ProgressBar-description', e).text())

    topHeroesRecord[id] = topHeroesRecord[id] ?? { id, gamemode, category, top_heroes: [] }
    topHeroesRecord[id].top_heroes.push({ hero, value })
  })

  return validate<InfraSightTopHeroesRecord>(InfraSightTopHeroesRecordSchema, topHeroesRecord)
}