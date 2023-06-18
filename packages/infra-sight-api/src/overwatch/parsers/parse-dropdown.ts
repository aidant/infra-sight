import type { CheerioAPI } from 'cheerio'
import { trace } from '../../telemetry.js'

export const parseDropdown = trace(
  {
    name: 'InfraSight.parser.parseDropdown',
  },
  ($: CheerioAPI, selector: string): Record<string, string> => {
    const options: Record<string, string> = {}

    $(selector).each((i, e) => {
      const element = $(e)
      const id = element.attr()?.['value']
      const title = element.text()

      if (!id || !title) return

      options[id] = title
    })

    return options
  }
)
