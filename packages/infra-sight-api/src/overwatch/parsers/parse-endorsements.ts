import type { InfraSightEndorsements } from '@infra-sight/sdk'
import type { CheerioAPI } from 'cheerio'
import { InfraSightEndorsementsSchema } from '../schemas/infra-sight-endorsements.js'
import { validate } from '../validate.js'

export const parseEndorsements = ($: CheerioAPI): InfraSightEndorsements => {
  const level = $('.Profile-playerSummary--endorsement')
    .attr()
    ?.['src']?.match(/endorsement\/(?<level>\d)/)?.groups?.['level']

  const endorsements: InfraSightEndorsements = {
    level: level ? parseInt(level) : null,
  }

  return validate<InfraSightEndorsements>(InfraSightEndorsementsSchema, endorsements)
}
