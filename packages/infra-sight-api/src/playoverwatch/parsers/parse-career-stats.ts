import { InfraSightCareerStatsRecord } from '@infra-sight/sdk'
import { CheerioAPI } from 'cheerio'
import { sanitize } from '../sanitize.js'
import { InfraSightCareerStatsRecordSchema } from '../schemas/infra-sight-career-stats-record.js'
import { validate } from '../validate.js'
import { parseDropdown } from './parse-dropdown.js'
import { parseGamemodes } from './parse-gamemodes.js'
import { parseNumber } from './parse-number.js'

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
  ies: [
    'enem',
  ]
}

const sanitizeWithPlurals = (name: string) => sanitize(name)
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

export const parseCareerStats = ($: CheerioAPI): InfraSightCareerStatsRecord => {
  const gamemodes = parseGamemodes($)
  const heroes = parseDropdown($, '[data-js="career-category"] select[data-group-id="stats"] option')

  const stats: InfraSightCareerStatsRecord = {}
  $(`[data-js="career-category"] tbody tr`).each((i, e) => {
    const element = $(e)

    const gamemodeId = element.parents('[data-js="career-category"]').attr()['data-mode']
    const category = element.parents('tbody.DataTable-tableBody').siblings('thead').text()
    const heroId = element.parents('.toggle-display').attr()['data-category-id']
    const stat = element.children().first().text()
    const valueRaw = element.children().next().text()
    
    const gamemode = gamemodes[gamemodeId]
    const hero = /all heroes/i.test(heroes[heroId]) ? null : heroes[heroId]
    const id = (hero ? [gamemodeId, hero, stat] : [gamemodeId, stat]).map(sanitizeWithPlurals).join('__')
    const value = parseNumber(valueRaw)

    stats[id] = { id, gamemode, category, hero, stat, value }
  })

  return validate<InfraSightCareerStatsRecord>(InfraSightCareerStatsRecordSchema, stats)
}