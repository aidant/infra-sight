import { OverwatchID } from './overwatch-id.js'
import { OverwatchPlatform } from './overwatch-platform.js'

export interface OverwatchAccount {
  name: string
  urlName: string
  id: number
  level: number
  playerLevel: number
  isPublic: boolean
  platform: OverwatchPlatform
  portrait: OverwatchID
}