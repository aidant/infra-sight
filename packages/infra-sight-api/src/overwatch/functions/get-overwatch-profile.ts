import { validateGetOverwatchAccountOptions, type GetOverwatchProfile } from '@infra-sight/sdk'
import { InfraSightErrorWithTracing } from '../../error.js'
import { trace } from '../../telemetry.js'
import { getOverwatchHTML } from '../overwatch.js'
import { parseProfile } from '../parsers/parse-profile.js'

export const getOverwatchProfile = trace<GetOverwatchProfile>(
  {
    name: 'InfraSight.function.getOverwatchProfile',
    with: (options) => ({
      'infra_sight.options.username': options.username,
      'infra_sight.options.resolution_strategy': options.resolution_strategy,
    }),
  },
  async function getOverwatchProfile(options) {
    validateGetOverwatchAccountOptions.call(
      { InfraSightError: InfraSightErrorWithTracing },
      options
    )

    const [account, heroes] = await Promise.all([
      this.getOverwatchAccount(options),
      this.getOverwatchHeroes(),
    ])

    if (!account.is_public)
      throw new InfraSightErrorWithTracing<'ConsumerPrivateProfile'>(
        'Consumer',
        'ConsumerPrivateProfile',
        `InfraSight is unable to access the profile of "${account.name}" on overwatch.blizzard.com; try adding the public resolution strategy or check the privacy settings of the account and try again.`,
        {
          username: options.username,
          resolution_strategy: options.resolution_strategy ?? [],
          account,
        }
      )

    const $ = await getOverwatchHTML(account.overwatch_url)
    return parseProfile($, account, heroes)
  }
)
