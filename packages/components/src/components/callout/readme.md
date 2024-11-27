# c2-callout

<!-- Auto Generated Below -->


## Overview

Calls out a piece of information.

## Usage

### Example

```tsx
import { randomIcon } from 'utils/helpers';

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
        <c2-callout
            class={'custom'}
            icon={randomIcon()}
            heading={'I am custom.'}
        >
            {'Check the css tab to see the customisations'}
        </c2-callout>
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



## Properties

| Property               | Attribute | Description                | Type                                                                 | Default     |
| ---------------------- | --------- | -------------------------- | -------------------------------------------------------------------- | ----------- |
| `heading` _(required)_ | `heading` | Heading text.              | `string`                                                             | `undefined` |
| `icon`                 | `icon`    | Override the variant icon. | `[namespace: string \| symbol, name: string] \| string \| undefined` | `undefined` |
| `variant`              | `variant` | Which color set to use.    | `"error" \| "info" \| "tip" \| "warning"`                            | `'tip'`     |


## Shadow Parts

| Part        | Description               |
| ----------- | ------------------------- |
| `"heading"` | Targets the heading text. |
| `"icon"`    | Targets the icon.         |


## CSS Custom Properties

| Name                 | Description                                                     |
| -------------------- | --------------------------------------------------------------- |
| `--background-color` | Background color. Can be set to a default via the variant prop. |
| `--border-color`     | Border color. Can be set to a default via the variant prop.     |
| `--foreground-color` | Text color. Can be set to a default via the variant prop.       |


----------------------------------------------


