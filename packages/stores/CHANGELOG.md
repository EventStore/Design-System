# @eventstore-ui/stores

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
