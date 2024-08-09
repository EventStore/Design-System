# @eventstore-ui/configs

## 1.1.1

### Patch Changes

-   [`13df770`](https://github.com/EventStore/Design-System/commit/13df7704117fdc1fc483bd2d3c05925e6229b061) - Fix publishing

## 1.1.0

### Minor Changes

-   [`a55cd76`](https://github.com/EventStore/Design-System/commit/a55cd76f8a7390867fc0b6d85e8ab8ea4153a75d) - Improvements:

    -   `renderLoadingState` prop in the `Page` component now accepts false to render normally.
    -   `TableCell` props `exptectedLength` and `variance` for `<es-loading-text />` rendering.
    -   `es-table` prop `loading` added to indicate `<es-loading-text />` rendering,.with `loadingRows` props to specify the number of rows to render.

    Bug fixes:

    -   Removed `fixStyle: 'inline-type-imports'` from ESLint rules due to compatibility issues with `@typescript-eslint/consistent-type-imports`.
