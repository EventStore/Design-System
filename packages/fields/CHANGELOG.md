# @kurrent-ui/fields

## 2.1.0

### Minor Changes

-   [`b0f2624f`](https://github.com/EventStore/Design-System/commit/b0f2624fef898cf25a72409216140857d6862303) - `FieldChangeEvent` is now more flexible.

    Previously, it only took the complete form type, and a key to the form:

    ```ts
    interface MyForm {
        something: number;
        another: string;
    }

    const handleSomethingChange = (
        e: FieldChangeEvent<MyForm, 'something'>,
    ) => {
        // e.details is now `{ name: "something", value: number }`
    };
    ```

    Now, you can also pass a typing as a single value, so it is easier to use outside of a validatedForm context:

    ```ts
    const handleSomethingChange = (e: FieldChangeEvent<number>) => {
        // e.details is now `{ name: string, value: number }`
    };
    ```

## 2.0.0

### Major Changes

-   [`e0c7cfdf`](https://github.com/EventStore/Design-System/commit/e0c7cfdf8c14e5bb5183e0c9f8c947e44fb8f368) - Move to @kurrent-ui namespace

## 1.1.1

### Patch Changes

-   [`13df770`](https://github.com/EventStore/Design-System/commit/13df7704117fdc1fc483bd2d3c05925e6229b061) - Fix publishing

## 1.1.0

### Minor Changes

-   [`7a0f5fb`](https://github.com/EventStore/Design-System/commit/7a0f5fb32350675d22f7970e7e1c117be05cb8e7) - Added the `es-multi-checkbox` component, which allows the selection of multiple options from a list of checkboxes. This component enhances the form handling capabilities by providing a flexible and user-friendly way to manage multi-selection inputs.

### Patch Changes

-   [`a9e23f7`](https://github.com/EventStore/Design-System/commit/a9e23f7f7b59091deb159a44757249899235ae6a) - Implement keyboard accessibility for es-checkbox

## 1.0.2

### Patch Changes

-   [`e1ee71d`](https://github.com/EventStore/Design-System/commit/e1ee71dcc4f3c6769d20ef247f5cb1f6d4d470f8) - Readmes updated

## 1.0.1

### Patch Changes

-   [`3e6c5b1`](https://github.com/EventStore/Design-System/commit/3e6c5b171bf3e1319ee1a5871a42d92483ff3eec) - Removed z-index workarounds for z-index stacking in @eventstore-ui/components

-   [`d884b7e`](https://github.com/EventStore/Design-System/commit/d884b7e2686bd3b6a44fee6310b92d2b1b4ca0a6) - [bug] Prevent situation where typeahead dropdown gets stuck open

## 1.0.0

### Minor Changes

-   [`1069a5d`](https://github.com/EventStore/Design-System/commit/1069a5d3af7986c56fd616049402315a59bc438c) - Update stencil to v4.0.2

### Patch Changes

-   Updated dependencies [[`1069a5d`](https://github.com/EventStore/Design-System/commit/1069a5d3af7986c56fd616049402315a59bc438c)]:
    -   @eventstore-ui/components@1.0.0
    -   @eventstore-ui/theme@1.0.0
