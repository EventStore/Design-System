```tsx
const error = new Error("Oh no! It's all gone wrong.");

export default () => (
    <l2-display-error error={error}>
        <es-button>{'Do something else'}</es-button>
    </l2-display-error>
);
```
