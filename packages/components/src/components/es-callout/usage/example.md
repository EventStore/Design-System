```tsx
import { randomIcon } from 'utils/helpers';

export default () => (
    <>
        <es-callout variant={'tip'} heading={'Daily tip.'}>
            {"Don't forget to feed your cat."}
        </es-callout>
        <es-callout variant={'info'} heading={'For your information.'}>
            {'A cow-bison hybrid is called a beefalo.'}
        </es-callout>
        <es-callout variant={'warning'} heading={'Beware.'}>
            {'There is danger ahead.'}
        </es-callout>
        <es-callout variant={'error'} heading={'We have an error here.'}>
            {'Something has gone horribly wrong.'}
        </es-callout>
        <es-callout
            class={'custom'}
            icon={randomIcon()}
            heading={'I am custom.'}
        >
            {'Check the css tab to see the customisations'}
        </es-callout>
    </>
);
```

```css
.custom {
    --strong-color: yellow;
    --weak-color: #35363a;
    color: #dadce0;
    border-left-width: 5px;
}

.custom::part(heading) {
    font-style: italic;
}

.custom::part(icon) {
    border-radius: 0;
    border-width: 5px;
}
```
