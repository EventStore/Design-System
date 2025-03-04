```tsx
const banners = [
    ['error', 'top', 'left'],
    ['warning', 'top', 'right'],
    ['success', 'bottom', 'left'],
    ['info', 'bottom', 'right'],
] as const;

export default () =>
    banners.map(([variant, y, x]) => (
        <div class={'card'}>
            <c2-corner-banner variant={variant} y={y} x={x}>
                {'Coming Soon'}
            </c2-corner-banner>
            {`${variant}`}
            <br />
            {`${y} ${x}`}
        </div>
    ));
```

```css
:host {
    display: grid;
    grid-template-columns: repeat(2, minmax(150px, 1fr));
    gap: 10px;
    align-items: center;
    justify-items: center;
    justify-content: center;
    align-content: center;
}

.card {
    position: relative;
    border: 1px solid var(--color-shade-50);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 12px;
    padding: 40px;
    text-align: center;
    width: 100%;
}
```
