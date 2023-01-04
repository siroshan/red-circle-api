# Red Circle API

Red Circle API is an API for [Red Circle](https://github.com/siroshan/red-circle) wine store e-commerce site. The project is still in progress. Built using [Nest](https://github.com/nestjs/nest) with PostgreSQL as database(https://www.postgresql.org).

## Description

Passport authentication library has been used to handle authentication. It's straightforward to integrate this library with a Nest application using the [@nestjs/passport](https://www.npmjs.com/package/@nestjs/passport) module. Here we will use [TypeORM](https://typeorm.io) object modeling tool to simplify the database intreactions with PostgreSQL.

## Progress

- [x] Product resource
- [ ] User resource
- [ ] Authentication
- [ ] Authorization
- [ ] Order resource

## Installation

Use the package manager [NPM](https://www.npmjs.com) to install.

```bash
npm i
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
