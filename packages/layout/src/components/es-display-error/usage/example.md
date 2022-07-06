```tsx
const error = new Error("Oh no! It's all gone wrong.");

export default () => (
    <es-display-error error={error}>
        <es-button>{'Do something else'}</es-button>
    </es-display-error>
);
```
