import {
  InfraSightError,
  InfraSightResolutionStrategy,
  validateGetOverwatchAccountOptions,
  type GetOverwatchAccount,
} from '@infra-sight/sdk'

export const getOverwatchAccount: GetOverwatchAccount = async function getOverwatchAccount(
  options
) {
  const { username, resolution_strategy = [] } = options
  validateGetOverwatchAccountOptions(options)

  let accounts = await this.searchOverwatchAccounts({ username })

  if (accounts.length === 0)
    throw new InfraSightError<'ConsumerUnknownAccount'>(
      'Consumer',
      'ConsumerUnknownAccount',
      `InfraSight was unable to find any accounts by the name of "${username}" on overwatch.blizzard.com; please check the spelling of the username and try again.`,
      {
        username,
      }
    )
  if (accounts.length === 1 && accounts[0]) return accounts[0]

  if (resolution_strategy.includes(InfraSightResolutionStrategy.Public))
    accounts = accounts.filter((account) => account.is_public)
  if (resolution_strategy.includes(InfraSightResolutionStrategy.CaseSensitive))
    accounts = accounts.filter((account) => account.name.includes(username))
  if (resolution_strategy.includes(InfraSightResolutionStrategy.LastUpdated))
    accounts = accounts[0] ? [accounts[0]] : []

  if (accounts.length === 1 && accounts[0]) return accounts[0]

  throw new InfraSightError<'ConsumerUnresolvableAccount'>(
    'Consumer',
    'ConsumerUnresolvableAccount',
    `InfraSight was unable to resolve the account by the name of "${username}" on overwatch.blizzard.com; please check the spelling of the username and try again.`,
    {
      username,
      resolution_strategy,
      accounts,
    }
  )
}
