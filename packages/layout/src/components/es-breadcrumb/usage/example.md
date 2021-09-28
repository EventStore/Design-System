```tsx
export default () => (
    <es-breadcrumb
        noValidate
        crumbs={[
            { name: 'This', path: './this' },
            { name: 'Is a', path: './is/a' },
            {
                name: 'Breadcrumb',
                path: `./breadcrumb`,
            },
        ]}
    />
);
```

```css
:host {
    display: flex;
    align-items: center;
    justify-content: center;
}
```
