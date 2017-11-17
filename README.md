# Infra-Sight
[![GitHub](https://img.shields.io/github/issues/AidanT/Infra-Sight.svg)](https://github.com/AidanT/Infra-Sight/issues)

## Do not use in production

## Routes
When using a BattleTag replace `#` with `~`.
> `/api/v1/profile/:account/:region`

### Valid regions:
> `us`, `eu`, `kr`, `psn`, `xbl`

### Example:
> `/api/v1/profile/Tracer~3939/us`
> Returns Tracer#3939's us region .

> `/api/v1/profile/Tracer~3939`
> Returns Tracer#3939's profile where level is highest.

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
