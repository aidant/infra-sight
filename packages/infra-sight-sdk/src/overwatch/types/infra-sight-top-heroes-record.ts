import type { InfraSightID } from './infra-sight-id.js'
import type { InfraSightTopHeroesList } from './infra-sight-top-heroes-list.js'

export type InfraSightTopHeroesRecord = Record<
  InfraSightID,
  {
    id: InfraSightID
    profile: string
    gamemode: string
    category: string
    top_heroes: InfraSightTopHeroesList
  }
>
