import { GetOverwatchAccount } from './playoverwatch/functions/get-overwatch-account.js'
import { GetOverwatchHeroes } from './playoverwatch/functions/get-overwatch-heroes.js'
import { GetOverwatchPlayerIcons } from './playoverwatch/functions/get-overwatch-player-icons.js'
import { GetOverwatchProfile } from './playoverwatch/functions/get-overwatch-profile.js'
import { SearchOverwatchAccounts } from './playoverwatch/functions/search-overwatch-accounts.js'

export interface InfraSightAPI {
  searchOverwatchAccounts: SearchOverwatchAccounts
  getOverwatchAccount: GetOverwatchAccount
  getOverwatchHeroes: GetOverwatchHeroes
  getOverwatchPlayerIcons: GetOverwatchPlayerIcons
  getOverwatchProfile: GetOverwatchProfile
}