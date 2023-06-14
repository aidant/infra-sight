import * as InfraSight from '@infra-sight/api'
import { InfraSightResolutionStrategy } from '@infra-sight/sdk'
import { expect, it } from 'vitest'

it('gets an overwatch profile', async () => {
  const profile = await InfraSight.getOverwatchProfile({
    username: 'Overwatch',
    resolution_strategy: [
      InfraSightResolutionStrategy.Public,
      InfraSightResolutionStrategy.LastUpdated,
      InfraSightResolutionStrategy.CaseSensitive,
    ],
  })

  expect(profile).toEqual({
    account: {
      name: expect.stringMatching(/Overwatch/i),
      portrait: expect.any(String),
      is_public: expect.any(Boolean),
      overwatch_url: expect.any(String),
    },
    career_stats: expect.any(Object),
    endorsements: expect.any(Object),
    skill_rating: expect.any(Object),
    top_heroes: expect.any(Object),
  })
})
