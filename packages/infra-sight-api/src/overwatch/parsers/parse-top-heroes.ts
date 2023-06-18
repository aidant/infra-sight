import type { InfraSightTopHeroesRecord } from '@infra-sight/sdk'
import type { CheerioAPI } from 'cheerio'
import { trace } from '../../telemetry.js'
import { sanitize } from '../sanitize.js'
import { InfraSightTopHeroesRecordSchema } from '../schemas/infra-sight-top-heroes-record.js'
import { validate } from '../validate.js'
import { parseDropdown } from './parse-dropdown.js'
import { parseGamemodes } from './parse-gamemodes.js'
import { parseNumber } from './parse-number.js'
import { parseProfiles } from './parse-profiles.js'

interface ParseTopHeroesByProfileAndGamemodeOptions {
  profileId: string
  profile: string
  gamemodeId: string
  gamemode: string
}

const parseTopHeroesByProfileAndGamemode = trace(
  {
    name: 'InfraSight.parser.parseTopHeroesByProfileAndGamemode',
    with: ($, prefix, { profileId, profile, gamemodeId, gamemode }) => ({
      'infra_sight.options.prefix': prefix,
      'infra_sight.options.profileId': profileId,
      'infra_sight.options.profile': profile,
      'infra_sight.options.gamemodeId': gamemodeId,
      'infra_sight.options.gamemode': gamemode,
    }),
  },
  (
    $: CheerioAPI,
    prefix: string,
    { profileId, profile, gamemodeId, gamemode }: ParseTopHeroesByProfileAndGamemodeOptions,
    topHeroesRecord: InfraSightTopHeroesRecord
  ) => {
    const categories = parseDropdown(
      $,
      `${prefix} .Profile-dropdown[data-dropdown-id="stat-dropdown"] option`
    )

    $(`${prefix} .Profile-progressBar`).each((i, e) => {
      const categoryNumber = $(e).parent().attr()?.['data-category-id']
      const category = categories[categoryNumber!]!
      const categoryId = sanitize(category)

      if (!categoryId) return

      const id = [profileId, gamemodeId, categoryId].join('__')

      const hero = $('.Profile-progressBar-title', e).text()
      const value = parseNumber($('.Profile-progressBar-description', e).text())
      const percentage = parseNumber(
        $('.Profile-progressBar--bar', e).attr()?.['data-progress'] + '%'
      )

      topHeroesRecord[id] ??= {
        id,
        profile,
        gamemode,
        category,
        top_heroes: [],
      }
      topHeroesRecord[id]!.top_heroes.push({ hero, value, percentage })
    })
  }
)

interface ParseTopHeroesByProfileOptions {
  profileId: string
  profile: string
}

const parseTopHeroesByProfile = trace(
  {
    name: 'InfraSight.parser.parseTopHeroesByProfile',
    with: ($, prefix, { profileId, profile }) => ({
      'infra_sight.options.prefix': prefix,
      'infra_sight.options.profileId': profileId,
      'infra_sight.options.profile': profile,
    }),
  },
  (
    $: CheerioAPI,
    prefix: string,
    { profileId, profile }: ParseTopHeroesByProfileOptions,
    topHeroesRecord: InfraSightTopHeroesRecord
  ) => {
    const gamemodes = parseGamemodes($, prefix)

    for (const [gamemodeKey, gamemode] of Object.entries(gamemodes)) {
      const gamemodeId = sanitize(gamemode)
      parseTopHeroesByProfileAndGamemode(
        $,
        `${prefix} .Profile-heroSummary--view.${gamemodeKey}-view`,
        { profileId, profile, gamemodeId, gamemode },
        topHeroesRecord
      )
    }
  }
)

export const parseTopHeroes = trace(
  {
    name: 'InfraSight.parser.parseTopHeroes',
  },
  ($: CheerioAPI): InfraSightTopHeroesRecord => {
    const topHeroesRecord: InfraSightTopHeroesRecord = {}

    const profiles = parseProfiles($)

    for (const [profileKey, profile] of Object.entries(profiles)) {
      const profileId = sanitize(profile)
      parseTopHeroesByProfile(
        $,
        `.Profile-view.${profileKey}-view`,
        { profileId, profile },
        topHeroesRecord
      )
    }

    return validate<InfraSightTopHeroesRecord>(InfraSightTopHeroesRecordSchema, topHeroesRecord)
  }
)
