# @kurrent-ui/stores

Data stores for stencil.

`@kurrent-ui/stores` builds upon [`@stencil/store`](https://github.com/ionic-team/stencil-store), with a few key differences:

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

### Add to your project

```sh
yarn add @kurrent-ui/stores
```

Also, include the peer dependencies:

```sh
yarn add @kurrent-ui/utils
```
