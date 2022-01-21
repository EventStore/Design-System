<!-- no-code -->
<!-- grow 320 -->

```tsx
const codeScheme = [
    'bg',
    'fg',
    'literal',
    'symbol',
    'keyword',
    'string',
    'error',
    'variable',
    'class',
    'comment',
];

const asVar = (key: string) => `--code-${key.replace(/_/g, '-')}`;

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
    grid-template-columns: repeat(4, 1fr);
}

.swatch:nth-child(-n + 2) {
    grid-column: span 2;
}

.swatch {
    display: flex;
    align-items: flex-end;
    border: 1px solid var(--color-contrast);
    border-radius: 4px;
    overflow: hidden;
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
