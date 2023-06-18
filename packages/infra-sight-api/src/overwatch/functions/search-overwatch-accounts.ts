import {
  validateSearchOverwatchAccountsOptions,
  type InfraSightAccountList,
  type OverwatchAccountList,
  type SearchOverwatchAccounts,
} from '@infra-sight/sdk'
import { InfraSightErrorWithTracing } from '../../error.js'
import { trace } from '../../telemetry.js'
import { getCareerProfileUrl, getOverwatchJSON, isNintendoSwitch, isPC } from '../overwatch.js'
import { InfraSightAccountListSchema } from '../schemas/infra-sight-account-list.js'
import { OverwatchAccountListSchema } from '../schemas/overwatch-account-list.js'
import { validate } from '../validate.js'

export const searchOverwatchAccounts = trace<SearchOverwatchAccounts>(
  {
    name: 'InfraSight.function.searchOverwatchAccounts',
    with: (options) => ({
      'infra_sight.options.username': options.username,
    }),
  },
  async function searchOverwatchAccounts({ username }) {
    validateSearchOverwatchAccountsOptions.call(
      { InfraSightError: InfraSightErrorWithTracing },
      { username }
    )

    /*
      The search account by name endpoint does not resolve a full nintendo switch
      account name, so to bypass this limitation we remove the 32 digit long
      identifier from the nintendo switch account name and then later match up the
      full name against the list of accounts.
    */
    const name = isNintendoSwitch(username)
      ? username.substring(0, username.lastIndexOf('-'))
      : username

    const [playerIcons, rawOverwatchSearchAccounts] = await Promise.all([
      this.getOverwatchPlayerIcons(),
      getOverwatchJSON('./search/account-by-name/' + encodeURIComponent(name)),
    ])

    const accounts: InfraSightAccountList = []
    const overwatchSearchAccounts = validate<OverwatchAccountList>(
      OverwatchAccountListSchema,
      rawOverwatchSearchAccounts
    ).sort((a, b) => (a.lastUpdated > b.lastUpdated ? -1 : 1))

    for (const overwatchAccount of overwatchSearchAccounts) {
      if (isPC(username) && username.toLowerCase() !== overwatchAccount.battleTag.toLowerCase())
        continue

      const account = {
        name: overwatchAccount.battleTag,
        portrait: playerIcons[overwatchAccount.portrait]?.url || null,
        is_public: overwatchAccount.isPublic,
        overwatch_url: getCareerProfileUrl(overwatchAccount.battleTag),
      }

      accounts.push(account)
    }

    return validate<InfraSightAccountList>(InfraSightAccountListSchema, accounts)
  }
)
