```tsx
export default () => (
    <>
        <c2-callout variant={'tip'} heading={'Daily tip.'}>
            {"Don't forget to feed your cat."}
        </c2-callout>
        <c2-callout variant={'info'} heading={'For your information.'}>
            {'A cow-bison hybrid is called a beefalo.'}
        </c2-callout>
        <c2-callout variant={'warning'} heading={'Beware.'}>
            {'There is danger ahead.'}
        </c2-callout>
        <c2-callout variant={'error'} heading={'We have an error here.'}>
            {'Something has gone horribly wrong.'}
        </c2-callout>
        <c2-callout class={'custom'} heading={'I am custom.'}>
            {'Check the css tab to see the customisations'}
        </c2-callout>
    </>
);
```

```css
:host {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.custom {
    --strong-color: yellow;
    --weak-color: #35363a;
    color: #dadce0;
    border-left-width: 5px;
}

.custom::part(heading) {
    font-style: italic;
}
```
