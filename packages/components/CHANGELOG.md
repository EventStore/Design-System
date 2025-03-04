# @kurrent-ui/components

## 2.4.0

### Minor Changes

-   [`919cdb25`](https://github.com/EventStore/Design-System/commit/919cdb250e9fbdcbf6e139079fd8c5c7371bd2d3) - c2-modal has been redesigned to fit with kurrent design language.

## 2.3.0

### Minor Changes

-   [`214f35df`](https://github.com/EventStore/Design-System/commit/214f35df89a403d472f1c0a78888af0e6d6a6dfc) - Table Details overhaul

    Table details has been redesigned to be

    -   More information dense
    -   Handle longer labels and data
    -   Fluidly size itself to it's available space

    Additionally, cell auto extract now handles more data types by attempting to convert all data type to a string, otherwise returning an empty placeholder.

### Patch Changes

-   [`b04e459e`](https://github.com/EventStore/Design-System/commit/b04e459e98473685d83782d8c4d878ec709640b8) - Fix missing spacing fallbacks

## 2.2.0

### Minor Changes

-   [`9d32b252`](https://github.com/EventStore/Design-System/commit/9d32b2527b4ed0b3dbf711c8026406dd8ddce5ad) - Actions have a new prop `displayContent` which allows them to display text content independently of if they are in a dropdown or not.

## 2.1.0

### Minor Changes

-   [`cbf9b64a`](https://github.com/EventStore/Design-System/commit/cbf9b64aa6741bc992ab46f0d36386d56a4ab86a) - Improved tabs design.

    -   `c2-tabs` has an improved design and layout.
    -   `c2-table-detail-header` has new `hasTabs` prop to improve look when heading a panel with tabs.

## 2.0.0

### Major Changes

[`01a02c12`](https://github.com/EventStore/Design-System/commit/01a02c12545701f8e6c6e784125a0e119db8a0ab) - @eventstore-ui/components has evolved to @kurrent-ui/components

#### Breaking changes

Component name changes

| 1.x                         | 2.x                         |
| --------------------------- | --------------------------- |
| es-accordian                | c2-accordian                |
| es-action                   | c2-action                   |
| es-action-dropdown          | c2-action-dropdown          |
| es-action-link              | c2-action-link              |
| es-action-with-confirmation | c2-action-with-confirmation |
| es-actions                  | c2-actions                  |
| es-badge                    | c2-badge                    |
| es-button                   | c2-button                   |
| es-button-link              | c2-button-link              |
| es-button-with-confirmation | c2-button-with-confirmation |
| es-thinking-button          | c2-thinking-button          |
| es-callout                  | c2-callout                  |
| es-copy                     | c2-copy                     |
| es-corner-banner            | c2-corner-banner            |
| es-counter                  | c2-counter                  |
| es-hole-puncher             | c2-hole-puncher             |
| es-icon                     | c2-icon                     |
| es-loading-dots             | c2-loading-dots             |
| es-loading-text             | c2-loading-text             |
| es-confirm-modal            | c2-confirm-modal            |
| es-modal                    | c2-modal                    |
| es-pagination               | c2-pagination               |
| es-popover                  | c2-popover                  |
| es-popper                   | c2-popper                   |
| es-popper-inner             | c2-popper-inner             |
| es-popper-x                 | c2-popper-x                 |
| es-popper-y                 | c2-popper-y                 |
| es-portal                   | c2-portal                   |
| es-backdrop                 | c2-backdrop                 |
| es-progression              | c2-progression              |
| es-resize-observer          | c2-resize-observer          |
| es-table-align              | c2-table-align              |
| es-table-variants           | c2-table-variants           |
| es-table                    | c2-table                    |
| es-table-detail             | c2-table-detail             |
| es-table-detail-header      | c2-table-detail-header      |
| es-table-nested             | c2-table-nested             |
| es-table-virtualized        | c2-table-virtualized        |
| es-tabs                     | c2-tabs                     |
| es-toast                    | c2-toast                    |
| es-toaster                  | c2-toaster                  |
| es-wizard                   | c2-wizard                   |

## 1.10.0

### Minor Changes

-   [`5d7cd1af`](https://github.com/EventStore/Design-System/commit/5d7cd1afad792a5f9918ad494f2e3d7773d8f2ae) - Adds `httpError` to toast, a utility for displaying error toasts with a fallback title.

    This utility provides a consistent approach for handling error toasts across the application. It supports detailed handling for HTTPError instances and includes a fallback title for non-HTTP errors. Refactored existing error toasts to use this new utility.

## 1.9.2

### Patch Changes

-   [`fb12b852`](https://github.com/EventStore/Design-System/commit/fb12b852960312a25b681349a93a674a08cbddea) - Improve button styles

-   [`4d8bb497`](https://github.com/EventStore/Design-System/commit/4d8bb497c229564da79111667386cf683369a302) - `es-tabs`: Ensure that the active tab exists.

## 1.9.1

### Patch Changes

-   [`ba7ea778`](https://github.com/EventStore/Design-System/commit/ba7ea77895ab29a35011349712d2c53b3228dba4) - Default error toast icon changed from skull to exclamation mark

## 1.9.0

### Minor Changes

-   [`5a90a4aa`](https://github.com/EventStore/Design-System/commit/5a90a4aa916ad50c6a79bcadaac11cecc022f409) - Adds es-button-with-confirmation, for confirming actions on standard buttons.

## 1.8.2

### Patch Changes

-   [`1cf41eab`](https://github.com/EventStore/Design-System/commit/1cf41eab2a52f4932f9ac528a24b691553c58f76) - Add tab name to panel and tab part.

## 1.8.1

### Patch Changes

-   [`13df770`](https://github.com/EventStore/Design-System/commit/13df7704117fdc1fc483bd2d3c05925e6229b061) - Fix publishing

## 1.8.0

### Minor Changes

-   [`20dcceb`](https://github.com/EventStore/Design-System/commit/20dccebe11067986fd5eb31aa7f9e5bf03063017) - Adds the `es-hole-puncher` element, to pass children through to the light DOM.

## 1.7.1

### Patch Changes

-   [`032ca21`](https://github.com/EventStore/Design-System/commit/032ca212ff5c4b72fb80df8d726aba1fb334091a) - Prevent es-loading-text from overflowing it's parents

## 1.7.0

### Minor Changes

-   [`a55cd76`](https://github.com/EventStore/Design-System/commit/a55cd76f8a7390867fc0b6d85e8ab8ea4153a75d) - Improvements:

    -   `renderLoadingState` prop in the `Page` component now accepts false to render normally.
    -   `TableCell` props `exptectedLength` and `variance` for `<es-loading-text />` rendering.
    -   `es-table` prop `loading` added to indicate `<es-loading-text />` rendering,.with `loadingRows` props to specify the number of rows to render.

    Bug fixes:

    -   Removed `fixStyle: 'inline-type-imports'` from ESLint rules due to compatibility issues with `@typescript-eslint/consistent-type-imports`.

## 1.6.1

### Patch Changes

-   [`afe6084`](https://github.com/EventStore/Design-System/commit/afe60846eb2e388c60b67a5acdd705d79a98545e) - Add missing `confirmVariant` to `ConfirmModalOptions`

-   [`59d3f19`](https://github.com/EventStore/Design-System/commit/59d3f19e254e80fc501f3457a6a19dd45175ef2a) - Add missing disabled prop to `es-action-dropdown`

## 1.6.0

### Minor Changes

-   [`389e7e2`](https://github.com/EventStore/Design-System/commit/389e7e26d2e558c853da0d08323b6447109fa2aa) - Add `actions` for use in tables and panel headers

    `es-actions` - Action container.
    `es-action` - Generic button action.
    `es-action-with-confirmation` - An action button with confirmation modal.
    `es-action-link` - Link action.
    `es-action-dropdown` - A dropdown to contain more actions.
    `ActionCopy` - Copy some text.
    `ActionDelete` - Delete icon and confirmation modal.
    `action.css` - Styles for creating custom actions.

### Patch Changes

-   [`918e384`](https://github.com/EventStore/Design-System/commit/918e384300a018ce4e048040b8efadf235db87d6) - Bug fix: Persist portaled elements when parent `es-portal` is moved in the DOM.

## 1.5.0

### Minor Changes

-   [`14620f6`](https://github.com/EventStore/Design-System/commit/14620f66117e6a1e2484f99236b523832958e695) - Previously, when passing data directly to a table's rows (rather than passing strings and using `getCellData`), the data objects were being used as keys, causing unnecessary re-renders.

    `es-table` will now warn when this is happening, and exposes a new prop `getRowKey` to allow you to convert the data into a stable key.

    `renderExpansion` is now more accurately typed to have the passed row as `any` and and additionally recieves this converted key, as well as the index of the row.
    `rowClass` is also more accurately typed to have the passed row as `any`.

    `es-table-nested` exposes both `getRowKey` and `getNestedRowKey` for the nested table.

## 1.4.0

### Minor Changes

-   [`600322d`](https://github.com/EventStore/Design-System/commit/600322d89f8920bf74aeadc577eb423702f34ffc) - `es-tabs`

    **Features**

    -   Add an icon between tabs with the `interTabIcon` and `interTabIconSize` props.
    -   "header-end" slot added, for placing buttons alongside tabs

    **Improvements**

    -   Tab sizes are now tracked, so that the indicator resizes (without animating) when the tabs are resized.
    -   Tabs will now evenly collapse, and elipsis overflowing text

    **Bug fixes**

    -   `activeParam` prop can now be changed after initial render

## 1.3.0

### Minor Changes

-   [`e1ee71d`](https://github.com/EventStore/Design-System/commit/e1ee71dcc4f3c6769d20ef247f5cb1f6d4d470f8) - `es-popover` improvements

    Bug Fixes:

    -   Prevent the popover from getting stuck closed when opening and closing too quickly
    -   Fix modifier css selectors on `es-popper-inner`

    Improvements:

    -   Split out x and y translations to `es-popover-x` and `es-popover-y` to allow transitioning each individuallly.
    -   Export `es-popover` types from index

## 1.2.0

### Minor Changes

-   [`6314c62`](https://github.com/EventStore/Design-System/commit/6314c6281b989b968e9a27a002c35f01e3de3362) - Prevent mouse interractions on readonly es-progressions

## 1.1.0

### Minor Changes

-   [`e54766e`](https://github.com/EventStore/Design-System/commit/e54766ee33543eedbe591f2a56a089a19e800afd) - New props on es-popover

    | Property              | Attribute                | Description                                                                            | Type      | Default |
    | --------------------- | ------------------------ | -------------------------------------------------------------------------------------- | --------- | ------- |
    | `closeOnScrollEscape` | `close-on-scroll-escape` | If the popover should request to close when the attachment element scrolls out of view | `boolean` | `false` |
    | `hideOnScrollEscape`  | `hide-on-scroll-escape`  | If the popover should hide itself when the attachment element scrolls out of view      | `boolean` | `true`  |

-   [`3e6c5b1`](https://github.com/EventStore/Design-System/commit/3e6c5b171bf3e1319ee1a5871a42d92483ff3eec) - Previously, a popover would have zindex of 1000 and modals a zindex of 3100. As popovers and modals appear outside of the document flow, these zindexes are relative to the base of the document.

    This usually worked out fine, as if you had an open popover and opened a modal, it would appear behind it:

    ```
    ┌────────────────┐
    │ Modal          │
    │                │
    │ zindex: 3100   ├─────────┐
    │                │ popover │
    │                │         │
    └───────────┬────┘         │
                │ zindex: 1000 │
                └──────────────┘
    ```

    However, if you placed a popover inside a modal, it would appear behind it's parent modal:

    ```
         ┌────────────────┐
         │ Modal          │
         │                │
         │ zindex: 3100   ├─────────┐
         │                │ popover │
    ┌────┤                │         │
    │    └─────────┬─┬────┘         │
    │ popover      │ │ zindex: 1000 │
    │ in modal     │ └──────────────┘
    │              │
    │ zindex: 4100 │
    └──────────────┘
    ```

    In this case, you would have to handle this yourself, and set the zindex manually.

    This update causes nested popovers and modals to stack their zindexes:

    ```
         ┌────────────────┐
         │ Modal          │
         │                │
         │ zindex: 3100   ├─────────┐
         │                │ popover │
    ┌────┴─────────┐      │         │
    │              ├─┬────┘         │
    │ popover      │ │ zindex: 1000 │
    │ in modal     │ └──────────────┘
    │              │
    │ zindex: 4100 │
    └──────────────┘
    ```

    This means that you don't need to keep track of z-indexes yourself, and allow you nest freely.

    It is also possible to manually increase the z-index stack by setting the css-var `--zindex-base`. This is useful for places where you have a z-index and may want a dropdown to appear, such as a header.

### Patch Changes

-   [`1f46d53`](https://github.com/EventStore/Design-System/commit/1f46d53e04f3bb51f3757c902ae9429a5ea2b883) - [bug] Prevent `es-popover` from losing attachment when layout is changed (e.g. resizing `es-panel`)

## 1.0.0

### Minor Changes

-   [`1069a5d`](https://github.com/EventStore/Design-System/commit/1069a5d3af7986c56fd616049402315a59bc438c) - Update stencil to v4.0.2

### Patch Changes

-   Updated dependencies [[`1069a5d`](https://github.com/EventStore/Design-System/commit/1069a5d3af7986c56fd616049402315a59bc438c)]:
    -   @eventstore-ui/router@1.0.0
    -   @kurrent-ui/theme@1.0.0
