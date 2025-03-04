# l2-breadcrumb

<!-- Auto Generated Below -->


## Overview

A list of breadcrumbs to the current page

## Usage

### Example

```tsx
export default () => (
    <l2-breadcrumb
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



## Properties

| Property     | Attribute     | Description                                                                                  | Type      | Default |
| ------------ | ------------- | -------------------------------------------------------------------------------------------- | --------- | ------- |
| `crumbs`     | --            | The breadcrumbs to the current page.                                                         | `Crumb[]` | `[]`    |
| `noValidate` | `no-validate` | Do not warn if the crumbs do not match the current router location. (Only warns in dev mode) | `boolean` | `false` |


----------------------------------------------


