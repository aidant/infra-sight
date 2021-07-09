import { InfraSightAccountList, InfraSightPlatform, OverwatchAccountList, SearchOverwatchAccounts, validateSearchOverwatchAccountsOptions } from '@infra-sight/sdk'
import { getCareerProfileUrl, isNintendoSwitch, isPC, playoverwatch } from '../playoverwatch.js'
import { InfraSightAccountListSchema } from '../schemas/infra-sight-account-list.js'
import { OverwatchAccountListSchema } from '../schemas/overwatch-account-list.js'
import { validate } from '../validate.js'

export const searchOverwatchAccounts: SearchOverwatchAccounts = async function searchOverwatchAccounts ({ username }) {
  validateSearchOverwatchAccountsOptions({ username })

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
    playoverwatch.json('./search/account-by-name/' + encodeURIComponent(name))
  ])

  const levels = new Map<string, number>()
  const accounts: InfraSightAccountList = []
  const overwatchSearchAccounts = validate<OverwatchAccountList>(OverwatchAccountListSchema, rawOverwatchSearchAccounts)
    .sort((a, b) => (a.level > b.level ? -1 : 1))

  for (const overwatchAccount of overwatchSearchAccounts) {
    if (isNintendoSwitch(username) && username.toLowerCase() !== overwatchAccount.urlName.toLowerCase()) continue
    if (isPC(username) && username.toLowerCase() !== overwatchAccount.name.toLowerCase()) continue

    const account = {
      name: overwatchAccount.name,
      level: overwatchAccount.level,
      portrait: playerIcons[overwatchAccount.portrait].url,
      is_public: overwatchAccount.isPublic,
      platform: overwatchAccount.platform.replace('nintendo-switch', 'nintendo_switch') as InfraSightPlatform,
      playoverwatch_url: getCareerProfileUrl(overwatchAccount.urlName, overwatchAccount.platform),
    }

    /*
      For some reason sometimes there are two entries for particular accounts,
      to remove the duplicate accounts we can assume that the accounts with the
      higher level has the latest details for the duplicate account (although
      the level is most likely the only difference between these accounts). 
    */
    const level = levels.get(account.playoverwatch_url) || -Infinity
    if (level > account.level) continue

    levels.set(account.playoverwatch_url, account.level)
    accounts.push(account)
  }

  return validate<InfraSightAccountList>(InfraSightAccountListSchema, accounts)
}
