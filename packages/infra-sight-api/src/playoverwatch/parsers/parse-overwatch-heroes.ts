import { OverwatchHeroList } from '@infra-sight/sdk'
import { CheerioAPI } from 'cheerio'
import { OverwatchHeroListSchema } from '../schemas/overwatch-hero-list.js'
import { validate } from '../validate.js'

export const parseOverwatchHeroes = ($: CheerioAPI): OverwatchHeroList => {
  const heroes: OverwatchHeroList = []
  $('.portrait-title').each((i, e) => {
    heroes.push($(e).text())
  })

  return validate<OverwatchHeroList>(OverwatchHeroListSchema, heroes)
}