import { InfraSightID } from './infra-sight-id.js'
import { InfraSightTopHeroesList } from './infra-sight-top-heroes-list.js'

export type InfraSightTopHeroesRecord = Record<InfraSightID, {
  id: InfraSightID,
  gamemode: string
  category: string
  top_heroes: InfraSightTopHeroesList
}>