---
'@eventstore-ui/stores': minor
---

Get's a single item from the list store, or inserts a default and returns it.

```ts
const item = store.getOrInsert('my-id', () => ({
    id: 'my-id',
    value: Math.random(),
}));
```
