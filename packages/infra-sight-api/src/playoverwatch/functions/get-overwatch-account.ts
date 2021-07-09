import { ErrorCode, GetOverwatchAccount, InfraSightError, InfraSightResolutionStrategy, validateGetOverwatchAccountOptions } from '@infra-sight/sdk'

export const getOverwatchAccount: GetOverwatchAccount = async function getOverwatchAccount (options) {
  const { username, platform, resolution_strategy = [] } = options
  validateGetOverwatchAccountOptions(options)

  let accounts = await this.searchOverwatchAccounts({ username })
  if (platform) accounts = accounts.filter(account => account.platform === platform)

  if (accounts.length === 0) throw new InfraSightError(ErrorCode.PlayOverwatchUnknownAccount, {})
  if (accounts.length === 1) return accounts[0]

  if (resolution_strategy.includes(InfraSightResolutionStrategy.CaseSensitive))
    accounts = accounts.filter(account => account.name.startsWith(username))
  if (resolution_strategy.includes(InfraSightResolutionStrategy.HighestLevel))
    accounts = [accounts[0]]

  if (accounts.length === 1) return accounts[0]

  throw new InfraSightError(ErrorCode.PlayOverwatchUnresolvableAccount, { options, accounts })
}
