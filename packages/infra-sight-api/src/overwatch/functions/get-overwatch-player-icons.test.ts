import * as InfraSight from '@infra-sight/api'
import { expect, it } from 'vitest'

it('lists all player icons in overwatch', async () => {
  const icons = await InfraSight.getOverwatchPlayerIcons()

  expect(icons).toMatchObject({
    '0x02500000000002F7': {
      name: 'Overwatch Dark',
      event: 'Overwatch',
      hero: null,
      url: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/c3090e3a1dccc58f143ff53801bc0cecb139f0eb1278f157d0b5e29db9104bed.png',
    },
    '0x0250000000001595': {
      name: 'Cute Ana',
      event: 'Overwatch',
      hero: 'Ana',
      url: 'https://d15f34w2p8l1cc.cloudfront.net/overwatch/d0386b290b50e2ef65e6103feb464aee607b38dc6e21a41c3c6334c8a1b57987.png',
    },
  })
})
