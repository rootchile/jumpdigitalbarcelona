# Jump Digital Barcelona

Project based on challenge of Jump Digital Barcelona you can find [here](https://nuwe.io/dev/challenges/jump2digital2022-backend).

[![CodeFactor](https://www.codefactor.io/repository/github/rootchile/jumpdigitalbarcelona/badge)](https://www.codefactor.io/repository/github/rootchile/jumpdigitalbarcelona) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rootchile_jumpdigitalbarcelona&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rootchile_jumpdigitalbarcelona)

## Stack

- Nodejs
- Express
- Knex
- Jest

## What is the goal ?

Build endpoints to get insights about companies data, such as order by funding date, size, and aggregated metrics.

## Available endpoints

```
/reports/companies?order=founded
/reports/companies?order=size
/reports/summary
```

## How to run

```
docker-compose up -d
npm install
npx knex migrate:up
npx knex seed:run
# dev o start (production)
npm run dev
```
