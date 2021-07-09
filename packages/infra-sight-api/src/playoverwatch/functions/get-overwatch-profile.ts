import { ErrorCode, GetOverwatchProfile, InfraSightError, validateGetOverwatchAccountOptions } from '@infra-sight/sdk'
import { parseProfile } from '../parsers/parse-profile.js'
import { playoverwatch } from '../playoverwatch.js'

export const getOverwatchProfile: GetOverwatchProfile = async function getOverwatchProfile (options) {
  validateGetOverwatchAccountOptions(options)

  const [account, heroes] = await Promise.all([
    this.getOverwatchAccount(options),
    this.getOverwatchHeroes(),
  ])
  
  if (!account.is_public) throw new InfraSightError(ErrorCode.PlayOverwatchPrivateProfile, { account })

  const $ = await playoverwatch.html(account.playoverwatch_url)
  return parseProfile($, account, heroes)
}