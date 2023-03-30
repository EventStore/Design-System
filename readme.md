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

## Common commands

| Description                  | Command                           | Example                   |
| :--------------------------- | :-------------------------------- | :------------------------ |
| Build all                    | `yarn build`                      |                           |
| Develop package              | `yarn dev {project}`              | `yarn dev layout`         |
| Build Docs                   | `yarn docs`                       |                           |
| Serve built Docs             | `yarn docs:serve`                 |                           |
| Develop Docs                 | `yarn dev docs`                   |                           |
| Lint all                     | `yarn lint`                       |                           |
| Test all                     | `yarn test`                       |                           |
| Run a command in a workspace | `yarn nx run {project}:{command}` | `yarn nx run layout:icon` |

[nodejs]: https://nodejs.org/en/
[yarn]: https://yarnpkg.com/
