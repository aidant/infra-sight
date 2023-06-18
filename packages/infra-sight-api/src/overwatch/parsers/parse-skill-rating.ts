import type { InfraSightRank, InfraSightSkillRating } from '@infra-sight/sdk'
import type { CheerioAPI } from 'cheerio'
import { trace } from '../../telemetry.js'
import { InfraSightSkillRatingSchema } from '../schemas/infra-sight-skill-rating.js'
import { validate } from '../validate.js'
import { parseNumber } from './parse-number.js'

export const parseSkillRating = trace(
  {
    name: 'InfraSight.parser.parseSkillRating',
  },
  ($: CheerioAPI): InfraSightSkillRating => {
    const sr: InfraSightSkillRating = {
      tank: null,
      offense: null,
      support: null,
    }

    $('.Profile-playerSummary--roleWrapper').each((i, e) => {
      const role = $('.Profile-playerSummary--role img', e)
        .attr()
        ?.['src']?.match(/role\/(?<role>[^-]+)/)?.groups?.['role']

      const tier = $('.Profile-playerSummary--rank', e)
        .attr()
        ?.['src']?.match(/rank\/(?<rank>.+?)Tier-(?<level>\d)/)?.groups

      const rank = tier?.['rank']
      const level = tier?.['level']

      sr[role as keyof InfraSightSkillRating] = {
        rank: rank?.toLowerCase() as InfraSightRank,
        level: parseNumber(level!),
      }
    })

    return validate<InfraSightSkillRating>(InfraSightSkillRatingSchema, sr)
  }
)
