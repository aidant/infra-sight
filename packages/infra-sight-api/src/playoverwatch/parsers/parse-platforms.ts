import { InfraSightPlatform, InfraSightPlatforms } from '@infra-sight/sdk'
import { CheerioAPI } from 'cheerio'
import { InfraSightPlatformsSchema } from '../schemas/infra-sight-platforms.js'
import { validate } from '../validate.js'

export const parsePlatforms = ($: CheerioAPI): InfraSightPlatforms => {
  const platforms: InfraSightPlatforms = {
    pc: null,
    psn: null,
    xbl: null,
    nintendo_switch: null
  }

  $('.masthead .button-group a').each((i, e) => {
    const element = $(e)
    const platformName = element.text().replace('nintendo switch', 'nintendo_switch') as InfraSightPlatform
    const platformLink = 'https://playoverwatch.com/en-us' + element.attr().href
    platforms[platformName] = platformLink
  })

  return validate<InfraSightPlatforms>(InfraSightPlatformsSchema, platforms)
}
