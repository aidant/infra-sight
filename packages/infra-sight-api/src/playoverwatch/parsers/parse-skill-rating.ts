import { InfraSightSkillRating } from '@infra-sight/sdk'
import { CheerioAPI } from 'cheerio'
import { InfraSightSkillRatingSchema } from '../schemas/infra-sight-skill-rating.js'
import { validate } from '../validate.js'
import { parseNumber } from './parse-number.js'

export const parseSkillRating = ($: CheerioAPI): InfraSightSkillRating => {
  const sr: InfraSightSkillRating = {
    tank: null,
    damage: null,
    support: null,
  }

  $('.masthead-player-progression:not(.masthead-player-progression--mobile) .competitive-rank .competitive-rank-role').each((i, e) => {
    const role = $('.competitive-rank-tier', e).attr()['data-ow-tooltip-text'].toLowerCase().split(' ')[0]
    const value = parseNumber($('.competitive-rank-level', e).text())
    
    sr[role as keyof InfraSightSkillRating] = value
  })

  return validate<InfraSightSkillRating>(InfraSightSkillRatingSchema, sr)
}