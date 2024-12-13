# @kurrent-ui/layout

## 2.1.0

### Minor Changes

-   [`cbf9b64a`](https://github.com/EventStore/Design-System/commit/cbf9b64aa6741bc992ab46f0d36386d56a4ab86a) - `l2-panel-header` has new `hasTabs` prop to improve look when heading a panel with tabs.

## 2.0.0

### Major Changes

[`b44b5da4`](https://github.com/EventStore/Design-System/commit/b44b5da4c12fc1dca9f6050cb1435b8cd891d6b6) - @eventstore-ui/layout has evolved to @kurrent-ui/layout

#### Breaking changes

Component name changes

| 1.x                  | 2.x                  |
| -------------------- | -------------------- |
| es-breadcrumb        | l2-breadcrumb        |
| es-layout-button     | l2-layout-button     |
| es-layout-link       | l2-layout-link       |
| es-display-error     | l2-display-error     |
| es-empty-state       | l2-empty-state       |
| es-header            | l2-header            |
| es-header-dropdown   | l2-header-dropdown   |
| es-layout-auto-label | l2-layout-auto-label |
| es-layout-hr         | l2-layout-hr         |
| es-layout-section    | l2-layout-section    |
| es-loading-bar       | l2-loading-bar       |
| es-logo              | l2-logo              |
| es-nav               | l2-nav               |
| es-nav-node-0        | l2-nav-node-0        |
| es-nav-node-1        | l2-nav-node-1        |
| es-nav-node-2        | l2-nav-node-2        |
| es-page-title        | l2-page-title        |
| es-panel             | l2-panel             |
| es-sized-panel       | l2-sized-panel       |
| es-panel-header      | l2-panel-header      |
| es-sidebar           | l2-sidebar           |
| es-sidebar-dropdown  | l2-sidebar-dropdown  |
| es-theme-dropdown    | l2-theme-dropdown    |
| es-theme-picker      | l2-theme-picker      |
| es-toolbar           | l2-toolbar           |

## 1.7.1

### Patch Changes

-   [`5760869c`](https://github.com/EventStore/Design-System/commit/5760869cda67f9f8b2cc14546a1c8511d8f87f03) - Bug fix: Prevent layout items from losing their connection to asigned panel on DOM move.

## 1.7.0

### Minor Changes

-   [`a7cf0cd2`](https://github.com/EventStore/Design-System/commit/a7cf0cd2c90979b0c0ba96e1e5eaf1f541d27278) - Allow `es-panel` and `es-sized-panel` to target the header area

    Previously, the `header` area was considered a special case, as it would always contain the header.
    We now allow the area to be targetted by panels and is treated like any other layout area.

## 1.6.0

### Minor Changes

-   [`6ea5f57f`](https://github.com/EventStore/Design-System/commit/6ea5f57fc719571481f337520d2ca2aefd7a632a) - Improve styleability of `es-layout-link` and `es-layout-button`.

    Changed:

    -   Use `focus-visible` rather than `focus`.

    Added parts:

    -   `counter` - The counter element, if rendered.
    -   `badge` - The badge element, if rendered.
    -   `icon` - The icon element, if rendered.

    Added css variables:

    -   `--icon-gap` - The space between the icon and the text
    -   `--icon-size` - The size of the icon.
    -   `--vertical-spacing` - The total space between one button and another.
    -   `--highlight-color` - The text color when the button is focused or hovered.
    -   `--highlight-background-color` - The background color when the button is focused or hovered.
    -   `--highlight-decoration` - The text decoration when the button is focused or hovered.

## 1.5.2

### Patch Changes

-   [`54817579`](https://github.com/EventStore/Design-System/commit/54817579af135fca7e672aa0b5ce6bdf57e06782) - Fix dragging handle in es-panel selects everything inside the panel

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
    -   `TableCell` props `exptectedLength` and `variance` for `<c2-loading-text />` rendering.
    -   `c2-table` prop `loading` added to indicate `<c2-loading-text />` rendering,.with `loadingRows` props to specify the number of rows to render.

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
    -   `es-logo` can now be used as an ouroboros, without text.

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

-   [`1f46d53`](https://github.com/EventStore/Design-System/commit/1f46d53e04f3bb51f3757c902ae9429a5ea2b883) - [bug] Prevent `c2-popover` from losing attachment when layout is changed (e.g. resizing `es-panel`)

-   [`46a1ad7`](https://github.com/EventStore/Design-System/commit/46a1ad7192cee02e65aa9af3663e0a00fa579342) - [bug] Prevent multiple header and sidebar dropdowns from opening at the same time

## 1.0.0

### Minor Changes

-   [`1069a5d`](https://github.com/EventStore/Design-System/commit/1069a5d3af7986c56fd616049402315a59bc438c) - Update stencil to v4.0.2

### Patch Changes

-   Updated dependencies [[`1069a5d`](https://github.com/EventStore/Design-System/commit/1069a5d3af7986c56fd616049402315a59bc438c)]:
    -   @eventstore-ui/sequences@1.0.0
    -   @eventstore-ui/components@1.0.0
    -   @eventstore-ui/router@1.0.0
    -   @eventstore-ui/theme@1.0.0
