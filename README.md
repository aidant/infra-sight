# Infra-Sight
An unofficial RESTful JSON API for Overwatch.

## Getting Started
Infra-Sight is built in [Node.Js](https://nodejs.org/) with [express](https://github.com/expressjs/express), [Request-Promise](https://github.com/request/request-promise) and [cheerio](https://github.com/cheeriojs/cheerio).

### Installing
#### Windows/OSX/Linux
##### Prerequisites
You will need [Node.Js](https://nodejs.org/en/download/) and [Git](https://git-scm.com/download) installed.
##### Clone the repo
```
git clone https://github.com/AidanT/Infra-Sight infra-sight
cd infra-sight
```
##### Run the app
```
npm install
npm start
```

#### Docker
##### Prerequisites
You will need [Docker](https://www.docker.com/get-docker) and [Git](https://git-scm.com/download) installed.
##### Clone the repo
```
git clone https://github.com/AidanT/Infra-Sight infra-sight
cd infra-sight
```
##### Build the image
```
docker build -t infra-sight .
```
##### Start the container
The argument `-p 3000:3000` exposes the port 3000 to the host.
```
docker run -p 3000:3000 infra-sight
```

### Routes
> /api/v1/profile/BattleTag-1234/region

#### Valid regions;
> us, eu, kr, psn, xbl

#### Example;
> /api/v1/profile/LazyGamer-11985/us

> /api/v1/profile/LazyGamer-11985

## Bugs
BattleTags that contain special characters currently don’t work.
