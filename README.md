# Infra-Sight
[![GitHub](https://img.shields.io/github/issues/AidanT/Infra-Sight.svg)](https://github.com/AidanT/Infra-Sight/issues)

### Why Infra-Sight?

I required an API for [Valkyrie](https://github.com/AidanT/Valkyrie) to interact with; After some research I failed to find any API’s that suited my needs, so I built my own.

### URL

Coming soon™

### Note
After the [Horizon Lunar Colony update](https://playoverwatch.com/en-us/game/patch-notes/pc/#patch-37456) the [playoverwatch](https://playoverwatch.com/en-us/) site incorrectly displays some new stats as `OVERWATCH.GUID.0X08600000000004BA`, `OF MATCH ON FIRE`...

## Routes
When using a BattleTag replace `#` with `~`.
> `/api/v1/profile/:account/:region`

### Valid regions:
> `us`, `eu`, `kr`, `psn`, `xbl`

### Example:
> `/api/v1/profile/Tracer~3939/us`
> Returns Tracer#3939's us region .

> `/api/v1/profile/Tracer~3939`
> Returns Tracer#3939's profile with the highest level.

## Result
This example is stats from A_Seagull’s `us` region. [Check out the full result](https://gist.github.com/AidanT/5935f8f929f2737f093d636750c02bc3).
```json
{
  "career_stats": [
    {
      "gamemode": "quickplay",
      "hero": "all",
      "stat": "melee_final_blows",
      "value": 323
    },
    {"..."}
  ],
  "competitive": {
    "games_lost": 0,
    "games_played": 172,
    "games_tied": 72,
    "games_won": 100,
    "heroes": {
      "time_played_seconds": [
        {
          "hero": "genji",
          "percentage": 1,
          "value": 43200
        },
        {"..."}
      ],
      "games_won": [
        {
          "hero": "genji",
          "percentage": 1,
          "value": 28
        },
        {"..."}
      ],
      "win_percentage": [
        {
          "hero": "sombra",
          "percentage": 1,
          "value": 100
        },
        {"..."}
      ],
      "weapon_accuracy": [
        {
          "hero": "mccree",
          "percentage": 1,
          "value": 0.51
        },
        {"..."}
      ],
      "eliminations_per_life": [
        {
          "hero": "zenyatta",
          "percentage": 1,
          "value": 5
        },
        {"..."}
      ],
      "multikill_best": [
        {
          "hero": "reaper",
          "percentage": 1,
          "value": 4
        },
        {"..."}
      ],
      "objective_kills_average": [
        {
          "hero": "sombra",
          "percentage": 1,
          "value": 17.93
        },
        {"..."}
      ]
    },
    "time_played_seconds": 140400,
    "rank": 4534
  },
  "images": {
    "heroes": {
      "genji": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E0000000000029.png",
      "hanzo": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E0000000000005.png",
      "mccree": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E0000000000042.png",
      "roadhog": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E0000000000040.png",
      "zarya": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E0000000000068.png",
      "mei": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E00000000000DD.png",
      "soldier76": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E000000000006E.png",
      "torbjorn": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E0000000000006.png",
      "junkrat": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E0000000000065.png",
      "lucio": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E0000000000079.png",
      "zenyatta": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E0000000000020.png",
      "symmetra": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E0000000000016.png",
      "winston": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E0000000000009.png",
      "reaper": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E0000000000002.png",
      "dva": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E000000000007A.png",
      "widowmaker": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E000000000000A.png",
      "bastion": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E0000000000015.png",
      "pharah": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E0000000000008.png",
      "reinhardt": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E0000000000007.png",
      "ana": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E000000000013B.png",
      "mercy": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E0000000000004.png",
      "tracer": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E0000000000003.png",
      "sombra": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E000000000012E.png",
      "orisa": "https://blzgdapipro-a.akamaihd.net/game/heroes/small/0x02E000000000013E.png"
    },
    "portrait": {
      "border": "https://blzgdapipro-a.akamaihd.net/game/playerlevelrewards/0x025000000000093C_Border.png",
      "star": "https://blzgdapipro-a.akamaihd.net/game/playerlevelrewards/0x025000000000093C_Rank.png"
    },
    "player_icon": "https://blzgdapipro-a.akamaihd.net/game/unlocks/0x0250000000000BAF.png",
    "rank": "https://blzgdapipro-a.akamaihd.net/game/rank-icons/season-2/rank-7.png"
  },
  "profile": {
    "platform_username": "Seagull#1894",
    "level": 341,
    "url": "https://playoverwatch.com/en-us/career/pc/us/Seagull-1894",
    "username": "Seagull"
  },
  "quickplay": {
    "games_won": 384,
    "heroes": {
      "time_played_seconds": [
        {
          "hero": "genji",
          "percentage": 1,
          "value": 28800
        },
        {"..."}
      ],
      "games_won": [
        {
          "hero": "genji",
          "percentage": 1,
          "value": 58
        },
        {"..."}
      ],
      "weapon_accuracy": [
        {
          "hero": "pharah",
          "percentage": 1,
          "value": 0.55
        },
        {"..."}
      ],
      "eliminations_per_life": [
        {
          "hero": "zarya",
          "percentage": 1,
          "value": 5.88
        },
        {"..."}
      ],
      "multikill_best": [
        {
          "hero": "zarya",
          "percentage": 1,
          "value": 6
        },
        {"..."}
      ],
      "objective_kills_average": [
        {
          "hero": "tracer",
          "percentage": 1,
          "value": 22.17
        },
        {"..."}
      ]
    },
    "time_played_seconds": 234000
  }
}
```


## Hosting

### Windows/OSX/Linux
#### Prerequisites
You will need [Node.js](https://nodejs.org/en/download/) and [Git](https://git-scm.com/download) installed, plus a copy of [MongoDB](https://docs.mongodb.com/manual/administration/install-community/).
#### Clone the repo
```
git clone https://github.com/AidanT/Infra-Sight infra-sight
cd infra-sight
```
#### Setup environment
If MongoDB isn't running on `localhost:27017` then: open `./config/env/development.js` and replace `localhost:27017` with the ip and port for the MongoDB.
#### Run the app
```
npm install
npm start
```

### Docker
#### Prerequisites
You will need [Docker](https://www.docker.com/get-docker) and [Git](https://git-scm.com/download) installed.
#### Clone the repo
```
git clone https://github.com/AidanT/Infra-Sight infra-sight
cd infra-sight
```
#### Create the network
```
docker network create infra-sight_network
```
#### Start MongoDB
Replace `some-mongo` with a cool name.
Replace `~/data/db`  with a directory of your choosing.
```
docker run --name some-mongo -p 27017:27017 -v ~/data/test/db:/data/db -d --net infra-sight_network  mongo
```
#### Build the image
```
docker build -t infra-sight .
```
#### Start the container
Replace `some-mongo` with the name of the MongoDB container.
```
docker run --name infra-sight -p 3000:3000 -e NODE_ENV=production -e databaseUri="mongodb://some-mongo:27017/infra-sight" --net infra-sight_network infra-sight
```
