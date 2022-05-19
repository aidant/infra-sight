# Infra Sight

![](https://cdn.aidan.pro/github/infra-sight.png)

<p align='center'>
  Infra-Sight is an elegant UX focused API for Overwatch.
  <a href='https://www.npmjs.com/package/@infra-sight/sdk'>
    <img src="https://img.shields.io/npm/v/@infra-sight/sdk?style=flat-square">
  </a>
  <a href='#api'>
    <img src="https://img.shields.io/website?down_message=Offline&label=API&style=flat-square&up_message=Online&url=https%3A%2F%2Finfra-sight.api.aidan.pro">
  </a>
</p>

---

## Table of Contents

- [Quick Start](#quick-start)
- [SDK](#sdk)
  - [`getOverwatchAccount`](#getoverwatchaccount)
  - [`getOverwatchHeroes`](#getoverwatchheroes)
  - [`getOverwatchPlayerIcons`](#getoverwatchplayericons)
  - [`getOverwatchProfile`](#getoverwatchprofile)
  - [`searchOverwatchAccounts`](#searchoverwatchaccounts)
  - [`listOverwatchAccountHistory`](#listoverwatchaccounthistory)
  - [`listOverwatchHeroesHistory`](#listoverwatchheroeshistory)
  - [`listOverwatchPlayerIconsHistory`](#listoverwatchplayericonshistory)
  - [`listOverwatchProfileHistory`](#listoverwatchprofilehistory)
- [API](#api)
  - [`GET /v2/api/overwatch/accounts/{username}/history`](#get-v2apioverwatchaccountsusernamehistory)
  - [`GET /v2/api/overwatch/accounts/{username}/latest`](#get-v2apioverwatchaccountsusernamelatest)
  - [`GET /v2/api/overwatch/accounts/{username}/search`](#get-v2apioverwatchaccountsusernamesearch)
  - [`GET /v2/api/overwatch/heroes/history`](#get-v2apioverwatchheroeshistory)
  - [`GET /v2/api/overwatch/heroes/latest`](#get-v2apioverwatchheroeslatest)
  - [`GET /v2/api/overwatch/player-icons/history`](#get-v2apioverwatchplayer-iconshistory)
  - [`GET /v2/api/overwatch/player-icons/latest`](#get-v2apioverwatchplayer-iconslatest)
  - [`GET /v2/api/overwatch/profiles/{username}/history`](#get-v2apioverwatchprofilesusernamehistory)
  - [`GET /v2/api/overwatch/profiles/{username}/latest`](#get-v2apioverwatchprofilesusernamelatest)

---

## Quick Start

```shell
npm install @infra-sight/sdk
```

```ts
import * as InfraSight from '@infra-sight/sdk'

const profile = await InfraSight.getOverwatchProfile('Tracer#3939')

console.log(profile)
```

---

## SDK

### `getOverwatchAccount`

#### Example

```ts
import * as InfraSight from '@infra-sight/sdk'

const account = await InfraSight.getOverwatchAccount()

console.log(account)
```

Returns `Promise<InfraSightAccount>`

### `getOverwatchHeroes`

#### Example

```ts
import * as InfraSight from '@infra-sight/sdk'

const heroes = await InfraSight.getOverwatchHeroes()

console.log(heroes)
```

Returns `Promise<OverwatchHeroList>`

### `getOverwatchPlayerIcons`

#### Example

```ts
import * as InfraSight from '@infra-sight/sdk'

const icons = await InfraSight.getOverwatchPlayerIcons()

console.log(icons)
```

Returns `Promise<InfraSightPlayerIconRecord>`

### `getOverwatchProfile`

#### Example

```ts
import * as InfraSight from '@infra-sight/sdk'

const profile = await InfraSight.getOverwatchProfile()

console.log(profile)
```

Returns `Promise<InfraSightProfile>`

### `searchOverwatchAccounts`

#### Example

```ts
import * as InfraSight from '@infra-sight/sdk'

const accounts = await InfraSight.searchOverwatchAccounts()

console.log(accounts)
```

Returns `Promise<InfraSightAccountList>`

### `listOverwatchAccountHistory`

#### Example

```ts
import * as InfraSight from '@infra-sight/sdk'

for await (const item of InfraSight.listOverwatchAccountHistory()) {
  console.log(item)
}
```

Returns `AsyncGenerator<string, void, never>`

### `listOverwatchHeroesHistory`

#### Example

```ts
import * as InfraSight from '@infra-sight/sdk'

for await (const item of InfraSight.listOverwatchHeroesHistory()) {
  console.log(item)
}
```

Returns `AsyncGenerator<string, void, never>`

### `listOverwatchPlayerIconsHistory`

#### Example

```ts
import * as InfraSight from '@infra-sight/sdk'

for await (const item of InfraSight.listOverwatchPlayerIconsHistory()) {
  console.log(item)
}
```

Returns `AsyncGenerator<string, void, never>`

### `listOverwatchProfileHistory`

#### Example

```ts
import * as InfraSight from '@infra-sight/sdk'

for await (const item of InfraSight.listOverwatchProfileHistory()) {
  console.log(item)
}
```

Returns `AsyncGenerator<string, void, never>`

---

## API

### `GET /v2/api/overwatch/accounts/{username}/history`

#### Parameters

- `page_token`

### `GET /v2/api/overwatch/accounts/{username}/latest`

#### Parameters

- `platform`
- `resolution_strategy`

### `GET /v2/api/overwatch/accounts/{username}/search`

### `GET /v2/api/overwatch/heroes/history`

#### Parameters

- `page_token`

### `GET /v2/api/overwatch/heroes/latest`

### `GET /v2/api/overwatch/player-icons/history`

#### Parameters

- `page_token`

### `GET /v2/api/overwatch/player-icons/latest`

### `GET /v2/api/overwatch/profiles/{username}/history`

#### Parameters

- `page_token`

### `GET /v2/api/overwatch/profiles/{username}/latest`

#### Parameters

- `platform`
- `resolution_strategy`
