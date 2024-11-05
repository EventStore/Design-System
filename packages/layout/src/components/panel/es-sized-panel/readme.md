# es-sized-panel

<!-- Auto Generated Below -->


## Overview

A panel that takes the size of it's content.
Automatically sets the relevant layout var based on it's size.

## Usage

### Example

```tsx
export default () => (
    <es-sized-panel>
        <p>{'I take the size of myself, and apply it to my area'}</p>
    </es-sized-panel>
);
```



## Properties

| Property | Attribute | Description                                                                 | Type                                                                                                     | Default     |
| -------- | --------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------- |
| `area`   | `area`    | Where to place the panel.                                                   | `"banner" \| "cookie" \| "header" \| "panel" \| "sidebar" \| "toolbar"`                                  | `'panel'`   |
| `end`    | `end`     | Where to end the panel, inclusive. Must be the opposite axis to the area.   | `"banner" \| "body" \| "cookie" \| "edge" \| "header" \| "panel" \| "sidebar" \| "toolbar" \| undefined` | `undefined` |
| `start`  | `start`   | Where to start the panel, inclusive. Must be the opposite axis to the area. | `"banner" \| "body" \| "cookie" \| "edge" \| "header" \| "panel" \| "sidebar" \| "toolbar" \| undefined` | `undefined` |


----------------------------------------------


