<!-- no-code -->
<!-- grow 1700 -->

```tsx
const baseScheme = {
    basic: [
        'background',
        'foreground',
        'title',
        'title_contrast',
        'highlight',
        'highlight_contrast',
        'link',
        'link_contrast',
        'focus',
        'focus_contrast',
    ],
    levels: [
        'error',
        'error_contrast',
        'error_alt',
        'error_alt_contrast',

        'warning',
        'warning_contrast',
        'warning_alt',
        'warning_alt_contrast',

        'success',
        'success_contrast',
        'success_alt',
        'success_alt_contrast',

        'info',
        'info_contrast',
        'info_alt',
        'info_alt_contrast',
    ],
    shades: [
        'shade_10',
        'shade_20',
        'shade_30',
        'shade_40',
        'shade_50',
        'shade_60',
    ],
    special: ['overlay', 'disabled', 'disabled_border', 'disabled_contrast'],
};

const asVar = (key: string) => `--color-${key.replace(/_/g, '-')}`;

export default () => (
    <div class={'wrapper'}>
        {Object.entries(baseScheme).map(([name, vars]) => (
            <>
                <span class={'group_name'}>{name}</span>
                <div class={`group ${name}`}>
                    {vars.map(asVar).map((color) => (
                        <div
                            class={'swatch'}
                            style={{ backgroundColor: `var(${color})` }}
                        >
                            <span>{color}</span>
                        </div>
                    ))}
                </div>
            </>
        ))}
    </div>
);
```

```css
:host {
    padding: 20px 0;
}

.group_name {
    display: block;
    margin: 12px 0;
    text-transform: capitalize;
}

.group {
    display: grid;
    gap: 10px;
    grid-auto-rows: minmax(100px, auto);
}

.basic {
    grid-template-columns: repeat(2, 1fr);
}

.scheme {
    grid-template-columns: repeat(3, 1fr);
}

.levels {
    grid-template-columns: repeat(4, 1fr);
}

.shades {
    grid-template-columns: repeat(6, 1fr);
}

.special {
    grid-template-columns: repeat(3, 1fr);
}

.swatch {
    display: flex;
    align-items: flex-end;
    border: 1px solid var(--color-foreground);
    border-radius: 4px;
    overflow: hidden;
}

.swatch span {
    display: inline-block;
    background-color: var(--color-background);
    color: var(--color-foreground);
    padding: 5px 10px;
    border-style: solid;
    border-color: var(--color-foreground);
    border-width: 1px 1px 0 0;
    border-top-right-radius: 4px;
}
```
