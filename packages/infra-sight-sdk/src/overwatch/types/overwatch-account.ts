import type { OverwatchID } from './overwatch-id.js'

export interface OverwatchAccount {
  battleTag: string
  frame: OverwatchID
  isPublic: boolean
  lastUpdated: number
  namecard?: OverwatchID
  portrait: OverwatchID
  title?: OverwatchID
}
