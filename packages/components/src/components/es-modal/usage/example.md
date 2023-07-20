```tsx
const token = 'abc-123-cde';

export default () => (
    <es-modal role={'alert'}>
        <h2 slot={'header'}>{'Successfully created a new'}</h2>
        <h1 slot={'header'}>{'Refresh token'}</h1>
        <es-input
            readonly
            class={'token'}
            name={'token'}
            placeholder={''}
            label={''}
            value={token}
            inputProps={{
                onFocus(e: FocusEvent) {
                    (e.target as HTMLInputElement).select();
                },
            }}
        >
            <es-thinking-button
                defaultIcon={'copy'}
                text={'Copy'}
                action={(e) => {
                    e.preventDefault();
                    return navigator.clipboard.writeText(token);
                }}
                variant={'outline'}
                color={'secondary'}
            />
        </es-input>
        <b class={'copy_warning'}>
            <es-icon icon={'critical'} />
            {"Be sure to copy your new token. It won't be shown again."}
        </b>
        <es-button variant={'filled'} color={'secondary'} slot={'footer'}>
            {'Done'}
        </es-button>
    </es-modal>
);
```

```css
.token {
    width: 100%;
    --field-grid-columns: [input] 1fr [before] 15px [after] 110px;
    --field-grid-gap: 0;
}

.copy_warning {
    display: flex;
    align-items: center;
}

.copy_warning es-icon {
    margin-right: 15px;
}

.done_button {
    min-width: 100px;
}
```
