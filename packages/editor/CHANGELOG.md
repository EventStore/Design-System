# @kurrent-ui/editor

## 3.0.0

### Major Changes

-   [`bc770362`](https://github.com/EventStore/Design-System/commit/bc7703628199bd8c7d5626221d66b490b10bf284) - # @eventstore-ui/editor has evolved to @kurrent-ui/editor

    ## Breaking changes

    `<es-editor />` has been renamed to `<e3-editor />`

-   [`e0c7cfdf`](https://github.com/EventStore/Design-System/commit/e0c7cfdf8c14e5bb5183e0c9f8c947e44fb8f368) - Move to @kurrent-ui namespace

### Patch Changes

-   Updated dependencies [[`bc770362`](https://github.com/EventStore/Design-System/commit/bc7703628199bd8c7d5626221d66b490b10bf284), [`e0c7cfdf`](https://github.com/EventStore/Design-System/commit/e0c7cfdf8c14e5bb5183e0c9f8c947e44fb8f368)]:
    -   @kurrent-ui/monaco-editor@2.0.0

## 2.0.2

### Patch Changes

-   [`2347c88e`](https://github.com/EventStore/Design-System/commit/2347c88edb7c6d8f322ddc4ee81041468fe2d57c) - Return codeThemes to editor

## 2.0.1

### Patch Changes

-   [`13df770`](https://github.com/EventStore/Design-System/commit/13df7704117fdc1fc483bd2d3c05925e6229b061) - Fix publishing

-   Updated dependencies [[`13df770`](https://github.com/EventStore/Design-System/commit/13df7704117fdc1fc483bd2d3c05925e6229b061)]:
    -   @eventstore-ui/monaco-editor@1.0.1

## 2.0.0

### Major Changes

-   [`20dcceb`](https://github.com/EventStore/Design-System/commit/20dccebe11067986fd5eb31aa7f9e5bf03063017) - Monaco editor has been moved to a seperate package: `@eventstore-ui/monaco-editor`.

    ## Breaking changes:

    ### `assetsPath`

    You must now also copy `assetsPath` as well as `workersPath`, into your served assets.

    ```ts
    import * as editor from '@eventstore-ui/editor/configure';

    // ...

                    {
                        src: editor.assetsPath,
                        dest: 'assets',
                    },
                    {
                        src: editor.workerPath,
                        dest: 'workers',
                    },
     // ...
    ```

    ### `IStandaloneEditorConstructionOptions`

    `es-editor`'s options prop may required different arguments, due to changes in monaco's `IStandaloneEditorConstructionOptions`

    ### `codeTheme`

    Child theme `codeTheme` has been removed, and is no-longer added to the global theme.

## 1.0.2

### Patch Changes

-   [`b3f8482`](https://github.com/EventStore/Design-System/commit/b3f848276d9bb09cb69313c3bbee0f548a1eb641) - Bug Fix: Fix editor failing to initialize

## 1.0.1

### Patch Changes

-   [`ba9a670`](https://github.com/EventStore/Design-System/commit/ba9a6701c3b27cd516c12763bb5581c9fe8550ae) - Use global monaco on window

## 1.0.0

### Minor Changes

-   [`1069a5d`](https://github.com/EventStore/Design-System/commit/1069a5d3af7986c56fd616049402315a59bc438c) - Update stencil to v4.0.2

### Patch Changes

-   Updated dependencies [[`1069a5d`](https://github.com/EventStore/Design-System/commit/1069a5d3af7986c56fd616049402315a59bc438c)]:
    -   @eventstore-ui/components@1.0.0
    -   @eventstore-ui/theme@1.0.0
