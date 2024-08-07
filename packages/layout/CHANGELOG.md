# @eventstore-ui/layout

## 1.5.1

### Patch Changes

-   [`13df770`](https://github.com/EventStore/Design-System/commit/13df7704117fdc1fc483bd2d3c05925e6229b061) - Fix publishing

## 1.5.0

### Minor Changes

-   [`032ca21`](https://github.com/EventStore/Design-System/commit/032ca212ff5c4b72fb80df8d726aba1fb334091a) - Automatically fade in pages when bypassing loading state in `Page`

## 1.4.0

### Minor Changes

-   [`f895224`](https://github.com/EventStore/Design-System/commit/f8952240ddcbe643b213f3d2babc0c5dd43adb08) - Add `es-empty-state` to be used as the `renderEmptyState` of `Page`

## 1.3.0

### Minor Changes

-   [`a55cd76`](https://github.com/EventStore/Design-System/commit/a55cd76f8a7390867fc0b6d85e8ab8ea4153a75d) - Improvements:

    -   `renderLoadingState` prop in the `Page` component now accepts false to render normally.
    -   `TableCell` props `exptectedLength` and `variance` for `<es-loading-text />` rendering.
    -   `es-table` prop `loading` added to indicate `<es-loading-text />` rendering,.with `loadingRows` props to specify the number of rows to render.

    Bug fixes:

    -   Removed `fixStyle: 'inline-type-imports'` from ESLint rules due to compatibility issues with `@typescript-eslint/consistent-type-imports`.

## 1.2.1

### Patch Changes

-   [`f888953`](https://github.com/EventStore/Design-System/commit/f888953ed9f08329ef2a0eb6769b90f9b753a9c2) - Export panel helpers

## 1.2.0

### Minor Changes

-   [`e1ee71d`](https://github.com/EventStore/Design-System/commit/e1ee71dcc4f3c6769d20ef247f5cb1f6d4d470f8) - Collapsable panels

    New Components:

    -   `es-layout-auto-label`: Attaches a popover label to selected children
    -   `es-layout-hr`: A horizontal rule, for dividing vertical panels

    Improvements:

    -   `es-panel` will now share it's panel mode with it's decendants, allowing them to change in response.
    -   `es-layout-button` & `es-layout-link` will change to a "collapsed" mode an ancestral `es-panel` is collapsed.
    -   `es-layout-section` will apply a popover label to collapsed `es-layout-button` & `es-layout-link`, and style itself for collapsing.
    -   `es-icon` can now be used as an ouroboros, without text.

    Bug fixes:

    -   `es-sized-panel` will correctly reset it's layout area on dismount.

## 1.1.1

### Patch Changes

-   [`af6da01`](https://github.com/EventStore/Design-System/commit/af6da01d226f8a546dd80fc28249cbdf3904b439) - Prevent grid blowout on layout grid.

## 1.1.0

### Minor Changes

-   [`de39237`](https://github.com/EventStore/Design-System/commit/de39237bc8e89de0b79a910be20f1ccf7b06ca8e) - New component `es-sized-panel` has been added that can be placed in any layout area, with a custom start and end position. It will set the size of the corresponding area to its own size, much like how `es-sidebar` works.

    The following props are available:

    | Property | Attribute | Description                                                                 | Type                                                                                         | Default     |
    | -------- | --------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------- |
    | `area`   | `area`    | Where to place the panel.                                                   | `"banner" \| "cookie" \| "panel" \| "sidebar" \| "toolbar"`                                  | `'panel'`   |
    | `end`    | `end`     | Where to end the panel, inclusive. Must be the opposite axis to the area.   | `"banner" \| "body" \| "cookie" \| "edge" \| "panel" \| "sidebar" \| "toolbar" \| undefined` | `undefined` |
    | `start`  | `start`   | Where to start the panel, inclusive. Must be the opposite axis to the area. | `"banner" \| "body" \| "cookie" \| "edge" \| "panel" \| "sidebar" \| "toolbar" \| undefined` | `undefined` |

-   [`e93f6bd`](https://github.com/EventStore/Design-System/commit/e93f6bd644bf9615772015ade9299caa410be41a) - `es-panel` can now be placed in any layout area, with a custom start and end position.
    You can also set a `closedMode`to allow the panel to collapse when dragged past the`closedSize`.
    It remains backwards compatible with previous usage.

    The following new props have been added:

    | Property       | Attribute       | Description                                                                 | Type                                                                                         | Default     |
    | -------------- | --------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------- |
    | `area`         | `area`          | Where to place the panel.                                                   | `"banner" \| "cookie" \| "panel" \| "sidebar" \| "toolbar"`                                  | `'panel'`   |
    | `closeAt`      | `close-at`      | When to snap the panel closed (if a closed mode is set).                    | `number`                                                                                     | `100`       |
    | `closedMode`   | `closed-mode`   | How the panel should respond to being closed.                               | `"collapsed" \| "none"`                                                                      | `'none'`    |
    | `closedSize`   | `closed-size`   | How large the panel should be when closed.                                  | `number`                                                                                     | `34`        |
    | `defaultSize`  | `default-size`  | What size to default to.                                                    | `number`                                                                                     | `200`       |
    | `end`          | `end`           | Where to end the panel, inclusive. Must be the opposite axis to the area.   | `"banner" \| "body" \| "cookie" \| "edge" \| "panel" \| "sidebar" \| "toolbar" \| undefined` | `undefined` |
    | `minimumSize`  | `minimum-size`  | The minimum possible size to resize to.                                     | `number`                                                                                     | `100`       |
    | `rememberMode` | `remember-mode` | If the last mode of the panel should be kept in local storage.              | `boolean \| string \| undefined`                                                             | `undefined` |
    | `rememberSize` | `remember-size` | If the size of the panel should be kept in local storage.                   | `boolean \| string \| undefined`                                                             | `undefined` |
    | `start`        | `start`         | Where to start the panel, inclusive. Must be the opposite axis to the area. | `"banner" \| "body" \| "cookie" \| "edge" \| "panel" \| "sidebar" \| "toolbar" \| undefined` | `undefined` |

## 1.0.1

### Patch Changes

-   [`3e6c5b1`](https://github.com/EventStore/Design-System/commit/3e6c5b171bf3e1319ee1a5871a42d92483ff3eec) - Removed z-index workarounds for z-index stacking in @eventstore-ui/components

-   [`1f46d53`](https://github.com/EventStore/Design-System/commit/1f46d53e04f3bb51f3757c902ae9429a5ea2b883) - [bug] Prevent `es-popover` from losing attachment when layout is changed (e.g. resizing `es-panel`)

-   [`46a1ad7`](https://github.com/EventStore/Design-System/commit/46a1ad7192cee02e65aa9af3663e0a00fa579342) - [bug] Prevent multiple header and sidebar dropdowns from opening at the same time

## 1.0.0

### Minor Changes

-   [`1069a5d`](https://github.com/EventStore/Design-System/commit/1069a5d3af7986c56fd616049402315a59bc438c) - Update stencil to v4.0.2

### Patch Changes

-   Updated dependencies [[`1069a5d`](https://github.com/EventStore/Design-System/commit/1069a5d3af7986c56fd616049402315a59bc438c)]:
    -   @eventstore-ui/illustrations@1.0.0
    -   @eventstore-ui/components@1.0.0
    -   @eventstore-ui/router@1.0.0
    -   @eventstore-ui/theme@1.0.0
