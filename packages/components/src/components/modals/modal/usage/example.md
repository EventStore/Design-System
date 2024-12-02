```tsx
const token = 'abc-123-cde';

export default () => (
    <c2-modal role={'alert'}>
        <h2 slot={'header'}>{'Successfully created a new'}</h2>
        <h1 slot={'header'}>{'Refresh token'}</h1>
        <f2-text-input
            readonly
            class={'token'}
            placeholder={'token'}
            name={'token'}
            value={token}
            inputProps={{
                onFocus(e: FocusEvent) {
                    (e.target as HTMLInputElement).select();
                },
            }}
        >
            <c2-thinking-button
                defaultIcon={'copy'}
                text={'Copy'}
                action={(e) => {
                    e.preventDefault();
                    return navigator.clipboard.writeText(token);
                }}
                variant={'outline'}
                color={'secondary'}
            />
        </f2-text-input>
        <b class={'copy_warning'}>
            <c2-icon icon={'critical'} />
            {"Be sure to copy your new token. It won't be shown again."}
        </b>
        <c2-button variant={'filled'} color={'secondary'} slot={'footer'}>
            {'Done'}
        </c2-button>
    </c2-modal>
);
```

```css
.token {
    width: 100%;
    margin-bottom: 16px;
}

.copy_warning {
    display: flex;
    align-items: center;
}

.copy_warning c2-icon {
    margin-right: 15px;
}

.done_button {
    min-width: 100px;
}
```
