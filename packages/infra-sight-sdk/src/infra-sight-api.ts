import type { GetOverwatchAccount } from './overwatch/functions/get-overwatch-account.js'
import type { GetOverwatchHeroes } from './overwatch/functions/get-overwatch-heroes.js'
import type { GetOverwatchPlayerIcons } from './overwatch/functions/get-overwatch-player-icons.js'
import type { GetOverwatchProfile } from './overwatch/functions/get-overwatch-profile.js'
import type { SearchOverwatchAccounts } from './overwatch/functions/search-overwatch-accounts.js'

export interface InfraSightAPI {
  searchOverwatchAccounts: SearchOverwatchAccounts
  getOverwatchAccount: GetOverwatchAccount
  getOverwatchHeroes: GetOverwatchHeroes
  getOverwatchPlayerIcons: GetOverwatchPlayerIcons
  getOverwatchProfile: GetOverwatchProfile
}
