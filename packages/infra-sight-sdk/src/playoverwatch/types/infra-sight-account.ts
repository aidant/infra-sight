import { InfraSightPlatform } from './infra-sight-platform.js'

export interface InfraSightAccount {
  name: string
  level: number
  portrait: string | null
  is_public: boolean
  platform: InfraSightPlatform
  playoverwatch_url: string
}
