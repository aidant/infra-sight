import { CheerioAPI } from 'cheerio'

export const parseGamemodes = ($: CheerioAPI): Record<string, string> => {
  const gamemodes: Record<string, string> = {}

  $('#profile-btn-switcher a').each((i, e) => {
    const element = $(e)
    
    const id = element.attr()['data-mode']
    const name = element.text()
  
    gamemodes[id] = name
  })

  return gamemodes
}