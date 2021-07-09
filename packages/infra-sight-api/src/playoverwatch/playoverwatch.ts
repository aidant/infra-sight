import { ErrorCode, InfraSightError, OverwatchPlatform } from '@infra-sight/sdk'
import cheerio from 'cheerio'

export const playoverwatch = async (request: string, init?: RequestInit) => {
  const response = await fetch(new URL(request, 'https://playoverwatch.com/en-us/').href, init)

  if (!response.ok) {
    throw new InfraSightError(ErrorCode.PlayOverwatchInvalidGateway, {})
  }

  return response
}

playoverwatch.json = (request: string, init?: RequestInit) => {
  return playoverwatch(request, init).then(response => response.json())
}
playoverwatch.html = (request: string, init?: RequestInit) => {
  return playoverwatch(request, init).then(response => response.text()).then(html => cheerio.load(html))
}

export const getCareerProfileUrl = (rawName: string, platform: OverwatchPlatform) => {
  const name = platform === 'pc'
    ? encodeURIComponent(rawName.replace('#', '-'))
    : encodeURIComponent(rawName)
  return `https://playoverwatch.com/en-us/career/${platform}/${name}`
}

export const isNintendoSwitch = (name: string) => name.match(/^.+?-[0-9A-F]{32}$/i)
export const isPC = (name: string) => name.match(/^.{3,12}#[0-9]{4,7}$/)
