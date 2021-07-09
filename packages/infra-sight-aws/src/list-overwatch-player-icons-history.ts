import { createListHandler } from './create-handler.js'

export const listOverwatchPlayerIconsHistory = createListHandler(() => {
  return {
    path: `/overwatch/player-icons/`
  }
})