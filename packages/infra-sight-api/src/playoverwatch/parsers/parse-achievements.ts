import { InfraSightAchievementRecord, OverwatchHero } from '@infra-sight/sdk'
import { CheerioAPI } from 'cheerio'
import { sanitize } from '../sanitize.js'
import { InfraSightAchievementRecordSchema } from '../schemas/infra-sight-achievement-record.js'
import { validate } from '../validate.js'
import { parseDropdown } from './parse-dropdown.js'

export const parseAchievements = ($: CheerioAPI, heroes: OverwatchHero[]): InfraSightAchievementRecord => {
  const categories = parseDropdown($, '#achievements-section select[data-group-id="achievements"] option')

  const achievements: InfraSightAchievementRecord = {}
  $('#achievements-section [data-category-id] .achievement-card-container').each((i, e) => {
    const name = $('.tooltip-tip h6', e).text()
    const categoryId = $(e).parent().parent().attr()['data-category-id']
    const category = categories[categoryId]
    const description = $('.tooltip-tip p', e).text()
    const unlocked = !$('.tooltip-handle', e).hasClass('m-disabled')
    const url = $('.tooltip-handle img.media-card-fill', e).attr().src

    const hero: OverwatchHero | null = ['Tank', 'Damage', 'Support'].includes(category)
      ? heroes.find(hero => description.toLowerCase().includes(hero.toLowerCase())) || null
      : null
    const id = (hero ? [category, hero, name] : [category, name]).map(sanitize).join('__')

    achievements[id] = { id, category, hero, name, description, unlocked, url }
  })
  
  return validate<InfraSightAchievementRecord>(InfraSightAchievementRecordSchema, achievements)
}