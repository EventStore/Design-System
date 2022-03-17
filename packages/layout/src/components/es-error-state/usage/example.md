```tsx
const error = new Error("Oh no! It's all gone wrong.");

export default () => (
    <es-error-state error={error}>
        <es-button>{'Do something else'}</es-button>
    </es-error-state>
);
```
