import { InfraSightEndorsements } from '@infra-sight/sdk'
import { CheerioAPI } from 'cheerio'
import { InfraSightEndorsementsSchema } from '../schemas/infra-sight-endorsements.js'
import { validate } from '../validate.js'

export const parseEndorsements = ($: CheerioAPI): InfraSightEndorsements => {
  const level = $('.masthead-player-progression:not(.masthead-player-progression--mobile) .u-center').text()

  const shotcaller = $('.masthead-player-progression:not(.masthead-player-progression--mobile) .endorsement-level svg.EndorsementIcon-border--shotcaller').attr()['data-value']
  const goodTeammate = $('.masthead-player-progression:not(.masthead-player-progression--mobile) .endorsement-level svg.EndorsementIcon-border--teammate').attr()['data-value']
  const sportsmanship = $('.masthead-player-progression:not(.masthead-player-progression--mobile) .endorsement-level svg.EndorsementIcon-border--sportsmanship').attr()['data-value']

  const endorsements: InfraSightEndorsements = {
    level: parseInt(level),
    percentages: {
      shotcaller: parseFloat(shotcaller),
      good_teammate: parseFloat(goodTeammate),
      sportsmanship: parseFloat(sportsmanship),
    },
  }

  return validate<InfraSightEndorsements>(InfraSightEndorsementsSchema, endorsements)
}