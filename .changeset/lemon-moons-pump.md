---
'@eventstore-ui/components': minor
'@eventstore-ui/layout': minor
'@eventstore-ui/configs': minor
---

Improvements:

    - The `renderLoadingState` prop in the `Page` component now accepts false as a parameter, which will render the component normally.
    - A new prop `loading` has been added to `es-table` to indicate if `cell.loading` should be used for rendering cells. Additionally, `loadingRows` has been introduced to specify the number of rows to render when `loading` is `true`, defaulting to `1`.

Bug fixes:
    - Removed `fixStyle: 'inline-type-imports'` from the ESLint rules section, as the latest version of `@typescript-eslint/consistent-type-imports` no longer supports it.
