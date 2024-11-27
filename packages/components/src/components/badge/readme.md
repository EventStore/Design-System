# c2-badge

<!-- Auto Generated Below -->


## Overview

Display a counter or dot beside a component to indicate action being required.

## Usage

### Example

```tsx
import { createStore } from '@kurrent-ui/stores';

interface CountStore {
    error: number;
    warning: number;
    okay: number;
}

const { state } = createStore<CountStore>({
    error: 1,
    warning: 0,
    okay: 1000,
});

export default () => (
    <>
        {/* counters */}

        <c2-badge color={'error'} count={state.error}>
            <c2-button onClick={() => (state.error += 1)}>{'Error'}</c2-button>
        </c2-badge>

        <c2-badge color={'warning'} count={state.warning}>
            <c2-button onClick={() => (state.warning += 1)}>
                {'Warning'}
            </c2-button>
        </c2-badge>

        <c2-badge color={'okay'} count={state.okay}>
            <c2-button onClick={() => (state.okay += 1)}>{'Okay'}</c2-button>
        </c2-badge>

        {/* variants */}

        <c2-badge color={'error'} count={state.error} variant={'outline'}>
            <c2-icon icon={'cog'} />
        </c2-badge>

        <c2-badge color={'warning'} count={state.warning} showZero>
            <c2-icon icon={'cog'} />
        </c2-badge>

        <c2-badge color={'okay'} count={state.okay} variant={'minimal'}>
            <c2-icon icon={'cog'} />
        </c2-badge>

        {/* dot */}

        <c2-badge variant={'dot'} color={'error'} count={state.error}>
            <c2-button variant={'outline'} onClick={() => (state.error += 1)}>
                {'Error'}
            </c2-button>
        </c2-badge>

        <c2-badge variant={'dot'} color={'warning'} count={state.warning}>
            <c2-button variant={'outline'} onClick={() => (state.warning += 1)}>
                {'Warning'}
            </c2-button>
        </c2-badge>

        <c2-badge variant={'dot'} color={'okay'} count={state.okay}>
            <c2-button variant={'outline'} onClick={() => (state.okay += 1)}>
                {'Okay'}
            </c2-button>
        </c2-badge>
    </>
);
```

```css
:host {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 40px;
    align-items: center;
    justify-items: center;
    justify-content: center;
    align-content: center;
}
```



## Properties

| Property             | Attribute   | Description                                                          | Type                                          | Default     |
| -------------------- | ----------- | -------------------------------------------------------------------- | --------------------------------------------- | ----------- |
| `color`              | `color`     | Choose the color variant of the badge                                | `"error" \| "okay" \| "warning" \| undefined` | `'error'`   |
| `count` _(required)_ | `count`     | What number to display in the counter (or if the dot should display) | `number`                                      | `undefined` |
| `showZero`           | `show-zero` | Show the dot and counter even if the count 0 (or negative)           | `boolean`                                     | `false`     |
| `size`               | `size`      | The base size (in px) of the counter (has no effect on the dot)      | `number \| undefined`                         | `undefined` |
| `variant`            | `variant`   | Select the display variant of the badge                              | `"dot" \| "filled" \| "minimal" \| "outline"` | `'filled'`  |


## CSS Custom Properties

| Name                       | Description                                                                       |
| -------------------------- | --------------------------------------------------------------------------------- |
| `--badge-background-color` | Background color of the badge. Can be set to a default via the color prop.        |
| `--badge-foreground-color` | Foreground (text) color of the badge. Can be set to a default via the color prop. |


## Dependencies

### Used by

 - [c2-action](../actions/action)
 - [c2-action-link](../actions/action-link)
 - [c2-action-with-confirmation](../actions/action-with-confirmation)
 - [c2-tabs](../tabs)

### Depends on

- [c2-counter](../counter)

### Graph
```mermaid
graph TD;
  c2-badge --> c2-counter
  c2-action --> c2-badge
  c2-action-link --> c2-badge
  c2-action-with-confirmation --> c2-badge
  c2-tabs --> c2-badge
  style c2-badge fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


