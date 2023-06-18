import { load } from 'cheerio/lib/slim'
import { InfraSightErrorWithTracing } from '../error.js'
import { trace } from '../telemetry.js'

const overwatch = async (request: string, init?: RequestInit | undefined) => {
  const response = await fetch(new URL(request, 'https://overwatch.blizzard.com/en-gb/').href, init)

  if (!response.ok) {
    throw new InfraSightErrorWithTracing<'OverwatchInvalidGateway'>(
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

export const getOverwatchJSON = trace(
  {
    name: 'InfraSight.utility.getOverwatchJSON',
    with: (request) => {
      const url = new URL(request, 'https://overwatch.blizzard.com/en-gb/')
      return {
        'infra_sight.request_url': url.href,
        'destination.domain': url.hostname,
        'destination.port':
          url.port || url.protocol === 'https:'
            ? '443'
            : url.protocol === 'http:'
            ? '80'
            : undefined,
      }
    },
  },
  async function getOverwatchJSON(request: string, init?: RequestInit | undefined) {
    const response = await overwatch(request, init)
    return await response.json()
  }
)

export const getOverwatchHTML = trace(
  {
    name: 'InfraSight.utility.getOverwatchHTML',
    with: (request) => ({
      'infra_sight.request_url': new URL(request, 'https://overwatch.blizzard.com/en-gb/').href,
    }),
  },
  async function getOverwatchHTML(request: string, init?: RequestInit | undefined) {
    const response = await overwatch(request, init)
    const html = await response.text()
    return load(html)
  }
)

export const getCareerProfileUrl = (rawName: string) => {
  const name = encodeURIComponent(rawName.replace('#', '-'))
  return `https://overwatch.blizzard.com/en-gb/career/${name}/`
}

export const isNintendoSwitch = (name: string) => name.match(/^.+?-[0-9A-F]{32}$/i)
export const isPC = (name: string) => name.match(/^.{3,12}#[0-9]{4,7}$/)
