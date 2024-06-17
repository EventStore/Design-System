# es-empty-state



<!-- Auto Generated Below -->


## Overview

Display an empty state with an illustration and a message.

## Usage

### Example

```tsx

export default () =>
<div>
    <es-empty-state header={'Example empty state'} body={<es-button>{'There are no items'}</es-button>}>
    <p slot='illustration'>{'Illustration here'}</p>
    <p slot='foot'>{ 'Footer goes here' }</p>
    </es-empty-state>
    <hr/>
    <es-empty-state header={'Example empty state'} body={'No items to show'} layout='horizontal'>
    <p slot='illustration'>{ 'Illustration here' }</p>
    <p slot='foot'>{ 'Footer goes here' }</p>
    </es-empty-state>
</div>
        
```



## Properties

| Property              | Attribute | Description                    | Type                         | Default      |
| --------------------- | --------- | ------------------------------ | ---------------------------- | ------------ |
| `body` _(required)_   | `body`    | The body of the empty state.   | `VNode \| string`            | `undefined`  |
| `header` _(required)_ | `header`  | The header of the empty state. | `string`                     | `undefined`  |
| `layout`              | `layout`  | The layout of the empty state. | `"horizontal" \| "vertical"` | `'vertical'` |


----------------------------------------------


