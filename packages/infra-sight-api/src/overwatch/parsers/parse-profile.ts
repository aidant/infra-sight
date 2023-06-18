import type { InfraSightAccount, InfraSightProfile, OverwatchHeroRecord } from '@infra-sight/sdk'
import { flatten } from '@infra-sight/telemetry'
import type { CheerioAPI } from 'cheerio'
import { trace } from '../../telemetry.js'
import { InfraSightProfileSchema } from '../schemas/infra-sight-profile.js'
import { validate } from '../validate.js'
import { parseCareerStats } from './parse-career-stats.js'
import { parseEndorsements } from './parse-endorsements.js'
import { parseSkillRating } from './parse-skill-rating.js'
import { parseTopHeroes } from './parse-top-heroes.js'

export const parseProfile = trace(
  {
    name: 'InfraSight.parser.parseProfile',
    with: ($, account) => ({
      ...flatten('infra_sight.options.account', account),
    }),
  },
  ($: CheerioAPI, account: InfraSightAccount, heroes: OverwatchHeroRecord): InfraSightProfile => {
    const profile: InfraSightProfile = {
      account,
      career_stats: parseCareerStats($),
      endorsements: parseEndorsements($),
      skill_rating: parseSkillRating($),
      top_heroes: parseTopHeroes($),
    }

    if (!profile.account.portrait) {
      profile.account.portrait = $('img.player-portrait').attr()?.['src'] || null
    }

    return validate<InfraSightProfile>(InfraSightProfileSchema, profile)
  }
)
