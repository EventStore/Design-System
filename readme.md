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

## Add Changesets

A changeset describes changes you've made in a specific package(s). Use it when you need to publish a change. Not all changes need a changeset. For instance, you don't need one for changes that don't affect the package or release notes.

Add a changeset with:

```sh
yarn log
```

You'll see prompts. Describe your changes and select the package(s) affected by your changes. This will determine the package versions to update. This creates a changeset file. Include this in your commit. When you're ready to release, Changesets will use this information to adjust package versions, make release notes, and publish packages.

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
