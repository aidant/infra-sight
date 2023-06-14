import type { CheerioAPI } from 'cheerio'
import { sanitize } from '../sanitize.js'

export const parseGamemodes = ($: CheerioAPI, prefix: string): Record<string, string> => {
  const gamemodes: Record<string, string> = {}

  const names: string[] = []

  $(`${prefix} .Profile-heroSummary--filters blz-button`).each((i, e) => {
    const name = $(e).text()
    names.push(name)
  })

  $(`${prefix} .Profile-heroSummary--view`).each((i, e) => {
    const classes = $(e)
      .attr()
      ?.['class']?.split(' ')
      .filter((c) => c !== 'Profile-heroSummary--view')
      .filter((c) => c.endsWith('-view'))

    if (classes) {
      for (const name of names) {
        const gamemode = sanitize(name)

        const id = classes
          .find((c) => c.startsWith(gamemode.replace(/_play$/, '')))
          ?.replace(/-view$/, '')

        if (id) {
          gamemodes[id] = name
        }
      }
    }
  })

  return gamemodes
}
