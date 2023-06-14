import * as InfraSight from '@infra-sight/api'
import { expect, it } from 'vitest'

it('lists all heroes in overwatch', async () => {
  const heroes = await InfraSight.getOverwatchHeroes()

  expect(heroes).toEqual({
    ana: {
      id: 'ana',
      name: 'Ana',
    },
    ashe: {
      id: 'ashe',
      name: 'Ashe',
    },
    baptiste: {
      id: 'baptiste',
      name: 'Baptiste',
    },
    bastion: {
      id: 'bastion',
      name: 'Bastion',
    },
    brigitte: {
      id: 'brigitte',
      name: 'Brigitte',
    },
    cassidy: {
      id: 'cassidy',
      name: 'Cassidy',
    },
    doomfist: {
      id: 'doomfist',
      name: 'Doomfist',
    },
    dva: {
      id: 'dva',
      name: 'D.Va',
    },
    echo: {
      id: 'echo',
      name: 'Echo',
    },
    genji: {
      id: 'genji',
      name: 'Genji',
    },
    hanzo: {
      id: 'hanzo',
      name: 'Hanzo',
    },
    junker_queen: {
      id: 'junker_queen',
      name: 'Junker Queen',
    },
    junkrat: {
      id: 'junkrat',
      name: 'Junkrat',
    },
    kiriko: {
      id: 'kiriko',
      name: 'Kiriko',
    },
    lifeweaver: {
      id: 'lifeweaver',
      name: 'Lifeweaver',
    },
    lucio: {
      id: 'lucio',
      name: 'Lúcio',
    },
    mei: {
      id: 'mei',
      name: 'Mei',
    },
    mercy: {
      id: 'mercy',
      name: 'Mercy',
    },
    moira: {
      id: 'moira',
      name: 'Moira',
    },
    orisa: {
      id: 'orisa',
      name: 'Orisa',
    },
    pharah: {
      id: 'pharah',
      name: 'Pharah',
    },
    ramattra: {
      id: 'ramattra',
      name: 'Ramattra',
    },
    reaper: {
      id: 'reaper',
      name: 'Reaper',
    },
    reinhardt: {
      id: 'reinhardt',
      name: 'Reinhardt',
    },
    roadhog: {
      id: 'roadhog',
      name: 'Roadhog',
    },
    sigma: {
      id: 'sigma',
      name: 'Sigma',
    },
    sojourn: {
      id: 'sojourn',
      name: 'Sojourn',
    },
    soldier_76: {
      id: 'soldier_76',
      name: 'Soldier: 76',
    },
    sombra: {
      id: 'sombra',
      name: 'Sombra',
    },
    symmetra: {
      id: 'symmetra',
      name: 'Symmetra',
    },
    torbjorn: {
      id: 'torbjorn',
      name: 'Torbjörn',
    },
    tracer: {
      id: 'tracer',
      name: 'Tracer',
    },
    widowmaker: {
      id: 'widowmaker',
      name: 'Widowmaker',
    },
    winston: {
      id: 'winston',
      name: 'Winston',
    },
    wrecking_ball: {
      id: 'wrecking_ball',
      name: 'Wrecking Ball',
    },
    zarya: {
      id: 'zarya',
      name: 'Zarya',
    },
    zenyatta: {
      id: 'zenyatta',
      name: 'Zenyatta',
    },
  })
})
