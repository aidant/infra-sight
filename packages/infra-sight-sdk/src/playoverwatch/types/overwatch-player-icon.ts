import { OverwatchHero } from './overwatch-hero.js'
import { OverwatchID } from './overwatch-id.js'

export interface OverwatchPlayerIcon {
  id: OverwatchID
  name: string
  type: {
    id: OverwatchID
    name: string
  }
  rarity: 'COMMON' | 'RARE'
  hero: {
    id: null | OverwatchID
    name: null | OverwatchHero
  }
  release: {
    id: OverwatchID
    name: string
    version: number
  }
  event: {
    id: OverwatchID
    name: string
  }
  icon: string
  isNew: boolean
  isMarked: boolean
  data:  {
    category: 'avatars'
    description: ''
    thumbnail: string
    name: string
    type: 'image'
    event: {
      id: OverwatchID
      name: string
    }
    release: {
      id: OverwatchID
      name: string
      version: number
      title: string
    },
    rarity: {
      name: 'COMMON'
      value: 0
    } | {
      name: 'RARE'
      value: 1
    }
    url: string
    videoWebm: false
    videoMp4: false
  }
}