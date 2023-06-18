import { flatten } from '@infra-sight/telemetry'
import type { CheerioAPI } from 'cheerio'
import { trace } from '../../telemetry.js'
import { sanitize } from '../sanitize.js'

export const parseGamemodes = trace(
  {
    name: 'InfraSight.parser.parseGamemodes',
    with: function ($, prefix) {
      return {
        'infra_sight.options.prefix': prefix,
        ...flatten('infra_sight.result.gamemodes', this.result),
      }
    },
  },
  ($: CheerioAPI, prefix: string): Record<string, string> => {
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
)
