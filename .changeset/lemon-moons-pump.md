---
'@eventstore-ui/components': minor
'@eventstore-ui/layout': minor
'@eventstore-ui/configs': minor
---

Improvements:

-   `renderLoadingState` prop in the `Page` component now accepts false to render normally.
-   `TableCell` props `exptectedLength` and `variance` for `<es-loading-text />` rendering.
-   `es-table` prop `loading` added to indicate `<es-loading-text />` rendering,.with `loadingRows` props to specify the number of rows to render.

Bug fixes:

-   Removed `fixStyle: 'inline-type-imports'` from ESLint rules due to compatibility issues with `@typescript-eslint/consistent-type-imports`.
