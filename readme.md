# Design System

Event Store component library and frontend utilities

## Prerequisites

Ensure you have [NodeJS] >=16.10 (current LTS) installed.

## Install dependancies

This repository uses [Yarn] with offline cache.

### Install `yarn` using the `corepack` command.

```sh
corepack enable
```

### Unpack `node_modules` from cache.

```sh
yarn
```

## Build

Build packages in the repo:

```sh
yarn build
```

Generate documentation:

```sh
yarn docs:generate
```

Run the docs

```sh
yarn docs:dev
```

[nodejs]: https://nodejs.org/en/
[yarn]: https://yarnpkg.com/
