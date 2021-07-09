import { InfraSightAccount, InfraSightProfile, OverwatchHeroList } from '@infra-sight/sdk'
import { CheerioAPI } from 'cheerio'
import { InfraSightProfileSchema } from '../schemas/infra-sight-profile.js'
import { validate } from '../validate.js'
import { parseAchievements } from './parse-achievements.js'
import { parseCareerStats } from './parse-career-stats.js'
import { parseEndorsements } from './parse-endorsements.js'
import { parsePlatforms } from './parse-platforms.js'
import { parseSkillRating } from './parse-skill-rating.js'
import { parseTopHeroes } from './parse-top-heroes.js'

export const parseProfile = ($: CheerioAPI, account: InfraSightAccount, heroes:  OverwatchHeroList): InfraSightProfile => {
  const profile: InfraSightProfile = {
    account,
    achievements: parseAchievements($, heroes),
    career_stats: parseCareerStats($),
    endorsements: parseEndorsements($),
    platforms: parsePlatforms($),
    skill_rating: parseSkillRating($),
    top_heroes: parseTopHeroes($),
  }

  return validate<InfraSightProfile>(InfraSightProfileSchema, profile)
}