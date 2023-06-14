import * as InfraSight from '@infra-sight/api'
import { InfraSightResolutionStrategy } from '@infra-sight/sdk'
import { describe, expect, it } from 'vitest'

describe('getOverwatchAccount', () => {
  it('gets an overwath account by username', async () => {
    const account = await InfraSight.getOverwatchAccount({ username: 'InfraSight#2815' })

    expect(account).toEqual({
      name: 'InfraSight#2815',
      portrait: expect.any(String),
      is_public: expect.any(Boolean),
      overwatch_url: expect.any(String),
    })
  })

  it('gets an overwath account by case sensitivity', async () => {
    const account = await InfraSight.getOverwatchAccount({
      username: 'InfraSight',
      resolution_strategy: [InfraSightResolutionStrategy.CaseSensitive],
    })

    expect(account).toEqual({
      name: expect.stringContaining('InfraSight'),
      portrait: expect.any(String),
      is_public: expect.any(Boolean),
      overwatch_url: expect.any(String),
    })
  })

  it('gets an overwath account by last updated', async () => {
    const account = await InfraSight.getOverwatchAccount({
      username: 'InfraSight',
      resolution_strategy: [InfraSightResolutionStrategy.LastUpdated],
    })

    expect(account).toEqual({
      name: expect.stringMatching(/InfraSight/i),
      portrait: expect.any(String),
      is_public: expect.any(Boolean),
      overwatch_url: expect.any(String),
    })
  })

  it('gets an overwath account by public filter', async () => {
    const account = await InfraSight.getOverwatchAccount({
      username: 'InfraSight',
      resolution_strategy: [
        InfraSightResolutionStrategy.Public,
        InfraSightResolutionStrategy.LastUpdated,
      ],
    })

    expect(account).toEqual({
      name: expect.stringMatching(/InfraSight/i),
      portrait: expect.any(String),
      is_public: true,
      overwatch_url: expect.any(String),
    })
  })

  it('throws an error when unable to resolve an account', async () => {
    const promise = InfraSight.getOverwatchAccount({
      username: 'InfraSight',
    })

    await expect(promise).rejects.toMatchObject({
      code: 'ConsumerUnresolvableAccount',
      detail: expect.objectContaining({
        username: 'InfraSight',
        resolution_strategy: [],
        accounts: expect.arrayContaining([
          {
            name: expect.any(String),
            portrait: expect.any(String),
            is_public: expect.any(Boolean),
            overwatch_url: expect.any(String),
          },
        ]),
      }),
    })
  })
})
