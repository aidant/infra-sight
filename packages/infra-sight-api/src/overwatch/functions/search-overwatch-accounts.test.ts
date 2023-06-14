import * as InfraSight from '@infra-sight/api'
import { expect, it } from 'vitest'

it('lists all overwatch accounts', async () => {
  const accounts = await InfraSight.searchOverwatchAccounts({
    username: 'InfraSight',
  })

  expect(accounts).toEqual(
    expect.arrayContaining([
      {
        name: expect.any(String),
        portrait: expect.any(String),
        is_public: expect.any(Boolean),
        overwatch_url: expect.any(String),
      },
    ])
  )
})
