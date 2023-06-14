import { InfraSightError } from '@infra-sight/sdk'
import { load } from 'cheerio/lib/slim'

export const overwatch = async (request: string, init?: RequestInit | undefined) => {
  const response = await fetch(new URL(request, 'https://overwatch.blizzard.com/en-gb/').href, init)

  if (!response.ok) {
    throw new InfraSightError<'OverwatchInvalidGateway'>(
      'Overwatch',
      'OverwatchInvalidGateway',
      `InfraSight is unable to reach overwatch.blizzard.com, an unexpected response of "${response.status} - ${response.statusText}" was received; please try again later or open an issue on InfraSight's GitHub repository if the problem persists.`,
      {
        url: response.url,
        status: response.status,
        body: await response.text().catch(() => null),
      }
    )
  }

  return response
}

overwatch.json = (request: string, init?: RequestInit | undefined) => {
  return overwatch(request, init).then((response) => response.json())
}
overwatch.html = (request: string, init?: RequestInit | undefined) => {
  return overwatch(request, init)
    .then((response) => response.text())
    .then((html) => load(html))
}

export const getCareerProfileUrl = (rawName: string) => {
  const name = encodeURIComponent(rawName.replace('#', '-'))
  return `https://overwatch.blizzard.com/en-gb/career/${name}/`
}

export const isNintendoSwitch = (name: string) => name.match(/^.+?-[0-9A-F]{32}$/i)
export const isPC = (name: string) => name.match(/^.{3,12}#[0-9]{4,7}$/)
