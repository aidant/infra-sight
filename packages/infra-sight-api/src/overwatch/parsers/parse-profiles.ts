import type { CheerioAPI } from 'cheerio'

export const parseProfiles = ($: CheerioAPI) => {
  const profiles: Record<string, string> = {}

  $('.Profile-player--filters blz-button').each((i, e) => {
    const id = $(e)
      .attr()
      ?.['id']?.replace(/Filter$/i, '')
    const name = $(e).text()

    if (!id || !name) return

    profiles[id] = name
  })

  return profiles
}
