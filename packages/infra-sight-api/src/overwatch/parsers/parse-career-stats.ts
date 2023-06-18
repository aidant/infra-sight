import type { InfraSightCareerStatsRecord } from '@infra-sight/sdk'
import type { CheerioAPI } from 'cheerio'
import { trace } from '../../telemetry.js'
import { sanitize } from '../sanitize.js'
import { InfraSightCareerStatsRecordSchema } from '../schemas/infra-sight-career-stats-record.js'
import { validate } from '../validate.js'
import { parseDropdown } from './parse-dropdown.js'
import { parseGamemodes } from './parse-gamemodes.js'
import { parseNumber } from './parse-number.js'
import { parseProfiles } from './parse-profiles.js'

const plruals = {
  s: [
    'assist',
    'barrier',
    'blow',
    'bomb',
    'boost',
    'card',
    'cast',
    'death',
    'elimination',
    'field',
    'game',
    'hit',
    'hook',
    'kill',
    'mech',
    'medal',
    'multikill',
    'pack',
    'pad',
    'player',
    'shield',
    'turret',
  ],
  ies: ['enem'],
}

const sanitizeWithPlurals = (name: string) =>
  sanitize(name)
    .replace(new RegExp(`(?<=_|^)(${plruals.s.join('|')})s?(?=_|$)`, 'g'), '$1s')
    .replace(new RegExp(`(?<=_|^)(${plruals.ies.join('|')})y?(?=_|$)`, 'g'), '$1ies')
    .replace('barriers_damage', 'barrier_damage')
    .replace('bombs_direct', 'bomb_direct')
    .replace('bombs_kills', 'bomb_kills')
    .replace('boosts_assists', 'boost_assists')
    .replace('deaths_blossom', 'death_blossom')
    .replace('fields_deaths', 'field_deaths')
    .replace('fields_healing', 'field_healing')
    .replace('hits_accuracy', 'hit_accuracy')
    .replace('hits_kills', 'hit_kills')
    .replace('hooks_accuracy', 'hook_accuracy')
    .replace('kills_streak', 'kill_streak')
    .replace('mechs_deaths', 'mech_deaths')
    .replace('packs_kills', 'pack_kills')
    .replace('turrets_damage', 'turret_damage')
    .replace('turrets_kills', 'turret_kills')
    .replace(/multikills(?!$)/, 'multikill')
    .replace(/games(?=$)/, 'game')

interface ParseCareerStatsByProfileAndGamemodeOptions {
  profileId: string
  profile: string
  gamemodeId: string
  gamemode: string
}

const parseCareerStatsByProfileAndGamemode = trace(
  {
    name: 'InfraSight.parser.parseCareerStatsByProfileAndGamemode',
    with: ($, prefix, { profileId, profile, gamemodeId, gamemode }, stats) => ({
      'infra_sight.options.profileId': profileId,
      'infra_sight.options.profile': profile,
      'infra_sight.options.gamemodeId': gamemodeId,
      'infra_sight.options.gamemode': gamemode,
    }),
  },
  (
    $: CheerioAPI,
    prefix: string,
    { profileId, profile, gamemodeId, gamemode }: ParseCareerStatsByProfileAndGamemodeOptions,
    stats: InfraSightCareerStatsRecord
  ) => {
    const heroes = parseDropdown(
      $,
      `${prefix} .Profile-dropdown[data-dropdown-id="hero-dropdown"] option`
    )

    $(`${prefix} .stats-container .stat-item`).each((i, e) => {
      const element = $(e)

      const category = element.siblings('.header').text()
      const heroId = element
        .parents('.stats-container')
        .attr()
        ?.['class']?.split(' ')
        .find((c) => c.startsWith('option-'))
        ?.replace(/^option-/, '')!
      const heroRaw = heroes[heroId]!
      const stat = element.children().first().text()
      const valueRaw = element.children().next().text()

      const hero = /all heroes/i.test(heroRaw) ? null : heroRaw
      const id = (hero ? [profileId, gamemodeId, hero, stat] : [profileId, gamemodeId, stat])
        .map(sanitizeWithPlurals)
        .join('__')
      const value = parseNumber(valueRaw)

      stats[id] = { id, profile, gamemode, category, hero, stat, value }
    })
  }
)

interface ParseCareerStatsByProfileOptions {
  profileId: string
  profile: string
}

const parseCareerStatsByProfile = trace(
  {
    name: 'InfraSight.parser.parseCareerStatsByProfile',
    with: ($, prefix, { profileId, profile }, stats) => ({
      'infra_sight.options.profileId': profileId,
      'infra_sight.options.profile': profile,
    }),
  },
  (
    $: CheerioAPI,
    prefix: string,
    { profileId, profile }: ParseCareerStatsByProfileOptions,
    stats: InfraSightCareerStatsRecord
  ) => {
    const gamemodes = parseGamemodes($, prefix)

    for (const [gamemodeKey, gamemode] of Object.entries(gamemodes)) {
      const gamemodeId = sanitize(gamemode)
      parseCareerStatsByProfileAndGamemode(
        $,
        `${prefix} .stats.${gamemodeKey}-view`,
        { profileId, profile, gamemodeId, gamemode },
        stats
      )
    }
  }
)

export const parseCareerStats = trace(
  {
    name: 'InfraSight.parser.parseCareerStats',
  },
  ($: CheerioAPI): InfraSightCareerStatsRecord => {
    const stats: InfraSightCareerStatsRecord = {}

    const profiles = parseProfiles($)

    for (const [profileKey, profile] of Object.entries(profiles)) {
      const profileId = sanitize(profile)
      parseCareerStatsByProfile(
        $,
        `.Profile-view.${profileKey}-view`,
        { profileId, profile },
        stats
      )
    }

    return validate<InfraSightCareerStatsRecord>(InfraSightCareerStatsRecordSchema, stats)
  }
)
