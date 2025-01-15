# @kurrent-ui/stores

## 2.0.1

### Patch Changes

-   [`e63b24dd`](https://github.com/EventStore/Design-System/commit/e63b24ddb98f52cafaf6c47abb1dfaf5b91c0609) - Bug Fix: `updateOrSet` returns the current value as-is, in line with `update`

## 2.0.0

### Major Changes

-   [`e0c7cfdf`](https://github.com/EventStore/Design-System/commit/e0c7cfdf8c14e5bb5183e0c9f8c947e44fb8f368) - Move to @kurrent-ui namespace

## 1.1.2

### Patch Changes

-   [`13df770`](https://github.com/EventStore/Design-System/commit/13df7704117fdc1fc483bd2d3c05925e6229b061) - Fix publishing

## 1.1.1

### Patch Changes

-   [`20dcceb`](https://github.com/EventStore/Design-System/commit/20dccebe11067986fd5eb31aa7f9e5bf03063017) - Standardization of builds across design system libraries.

## 1.1.0

### Minor Changes

-   [`a643d2e`](https://github.com/EventStore/Design-System/commit/a643d2e58260d4cfac589deae5faafb60cd11f14) - Get's a single item from the list store, or inserts a default and returns it.

    ```ts
    const item = store.getOrInsert('my-id', () => ({
        id: 'my-id',
        value: Math.random(),
    }));
    ```

## 1.0.0

### Minor Changes

-   [`1069a5d`](https://github.com/EventStore/Design-System/commit/1069a5d3af7986c56fd616049402315a59bc438c) - Update stencil to v4.0.2
