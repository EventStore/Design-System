# es-validation-messages

<!-- Auto Generated Below -->


## Overview

Display messages under fields.

## Usage

### Example

```tsx
export default () => (
    <f2-validation-messages
        messages={{
            error: ['Oh no!'],
            warning: ['Watch out!', "It's hot!"],
            info: [
                'It will cool down soon.',
                (h) => <c2-button>{'hello'}</c2-button>,
            ],
        }}
    />
);
```



## Properties

| Property      | Attribute      | Description                                                        | Type                                                    | Default                       |
| ------------- | -------------- | ------------------------------------------------------------------ | ------------------------------------------------------- | ----------------------------- |
| `errorIcon`   | `error-icon`   | Icon to diplay next to errors. (if `showIcons` or high contrast)   | `[namespace: string \| symbol, name: string] \| string` | `[ICON_NAMESPACE, 'error']`   |
| `infoIcon`    | `info-icon`    | Icon to diplay next to infos. (if `showIcons` or high contrast)    | `[namespace: string \| symbol, name: string] \| string` | `[ICON_NAMESPACE, 'info']`    |
| `messages`    | --             | The messages to display.                                           | `ValidationMessages \| undefined`                       | `undefined`                   |
| `warningIcon` | `warning-icon` | Icon to diplay next to warnings. (if `showIcons` or high contrast) | `[namespace: string \| symbol, name: string] \| string` | `[ICON_NAMESPACE, 'warning']` |


## Dependencies

### Depends on

- c2-icon

### Graph
```mermaid
graph TD;
  f2-validation-messages --> c2-icon
  style f2-validation-messages fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


