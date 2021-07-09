import { createListHandler } from './create-handler.js'

export const listOverwatchHeroesHistory = createListHandler(() => {
  return {
    path: `/overwatch/heroes/`
  }
})