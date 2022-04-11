# @eventstore/stores

Data stores for stencil.

`@eventstore/stores` builds upon [`@stencil/store`](https://github.com/ionic-team/stencil-store), with a few key differences:

-   Support for removing keys (and their values) from the store, allowing arbitrary key value records.

    ```ts
    const { state } = createStore<Record<string, string>>();

    state.something = 'something';

    delete state.something;
    ```

-   Addition of specialized store types, with extra helper methods:

    -   [`ListStore`](/stores/utils/createListStore)
    -   [`CorrelationStore`](/stores/utils/createCorrelationStore)

-   Removal of ie11 support.

## Install

### Log in to github packages

```sh
$ npm login --registry=https://npm.pkg.github.com
> Username: USERNAME
> Password: TOKEN
> Email: PUBLIC-EMAIL-ADDRESS
```

`TOKEN` can be obtained from https://github.com/settings/tokens and requires `repo` and `read:packages` permissions

### Add to your project

```sh
yarn add @eventstore/stores
```

Also, include the peer dependencies:

```sh
yarn add @eventstore/utils
```
