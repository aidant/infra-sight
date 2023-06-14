import {
  InfraSightError,
  validateGetOverwatchAccountOptions,
  type GetOverwatchProfile,
} from '@infra-sight/sdk'
import { overwatch } from '../overwatch.js'
import { parseProfile } from '../parsers/parse-profile.js'

export const getOverwatchProfile: GetOverwatchProfile = async function getOverwatchProfile(
  options
) {
  validateGetOverwatchAccountOptions(options)

  const [account, heroes] = await Promise.all([
    this.getOverwatchAccount(options),
    this.getOverwatchHeroes(),
  ])

  if (!account.is_public)
    throw new InfraSightError<'ConsumerPrivateProfile'>(
      'Consumer',
      'ConsumerPrivateProfile',
      `InfraSight is unable to access the profile of "${account.name}" on overwatch.blizzard.com; try adding the public resolution strategy or check the privacy settings of the account and try again.`,
      {
        username: options.username,
        resolution_strategy: options.resolution_strategy ?? [],
        account,
      }
    )

  const $ = await overwatch.html(account.overwatch_url)
  return parseProfile($, account, heroes)
}
