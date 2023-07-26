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

## Managing changelogs

We use [changesets](https://github.com/changesets/changesets) to help us prepare releases. It helps us update package versions and add notes to the `CHANGELOG.md` for any package that's changed.

A changeset is a record of changes made to specific packages. Create one when you need to publish a change that affects a package or the release notes. Not all changes need a changeset, though. For example, if your changes don't affect a package or the release notes, you don't need a changeset.

### Creating a changeset

1. Run `yarn changelog`
2. Follow the prompts to describe your changes and pick the packages they affect. This selection helps determine which package versions need updates.
3. This process generates a markdown changeset file in the `.changeset` directory. Each file outlines your changes and the affected packages.
4. Include the changeset file(s) in your commit. They're essential for the upcoming release process.
5. If necessary, you can generate multiple changesets by running the command multiple times. Each run generates a new changeset file.
6. When pull request are merged into `main` branch, the changesets tool will automatically batch these changesets together and open a pull request with updates to the changelogs and version bumps for the affected packages.

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
