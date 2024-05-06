# @eventstore-ui/components

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
    -   @eventstore-ui/theme@1.0.0
