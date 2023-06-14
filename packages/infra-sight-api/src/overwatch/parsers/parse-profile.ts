import type { InfraSightAccount, InfraSightProfile, OverwatchHeroRecord } from '@infra-sight/sdk'
import type { CheerioAPI } from 'cheerio'
import { InfraSightProfileSchema } from '../schemas/infra-sight-profile.js'
import { validate } from '../validate.js'
import { parseCareerStats } from './parse-career-stats.js'
import { parseEndorsements } from './parse-endorsements.js'
import { parseSkillRating } from './parse-skill-rating.js'
import { parseTopHeroes } from './parse-top-heroes.js'

export const parseProfile = (
  $: CheerioAPI,
  account: InfraSightAccount,
  heroes: OverwatchHeroRecord
): InfraSightProfile => {
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
