<!-- no-code -->
<!-- grow 320 -->

```tsx
const codeScheme = [
    'base',
    'contrast',
    'highlight',
    'title',
    'shade_10',
    'shade_20',
    'shade_30',
    'shade_40',
    'shade_50',
    'shade_60',
    'shade_70',
];

const asVar = (key: string) => `--color-layout-${key.replace(/_/g, '-')}`;

export default () => (
    <div class={'wrapper'}>
        {codeScheme.map(asVar).map((color) => (
            <div class={'swatch'} style={{ backgroundColor: `var(${color})` }}>
                <span>{color}</span>
            </div>
        ))}
    </div>
);
```

```css
:host {
    display: contents;
}

.group_name {
    display: block;
    margin: 12px 0;
    text-transform: capitalize;
}

.wrapper {
    display: grid;
    gap: 10px;
    grid-auto-rows: minmax(100px, auto);
    grid-template-columns: repeat(28, 1fr);
}

.swatch {
    display: flex;
    align-items: flex-end;
    border: 1px solid var(--color-contrast);
    border-radius: 4px;
    overflow: hidden;
    grid-column: span 4;
    grid-row: span 2;
}

.swatch:nth-child(-n + 4) {
    grid-column: span 7;
    grid-row: span 1;
}

.swatch span {
    display: inline-block;
    background-color: var(--color-background);
    color: var(--color-text);
    padding: 5px 10px;
    border-style: solid;
    border-color: var(--color-contrast);
    border-width: 1px 1px 0 0;
    border-top-right-radius: 4px;
}
```
