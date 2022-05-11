# es-button



<!-- Auto Generated Below -->


## Usage

### Example

```tsx
import { randomIcon } from 'helpers';

export default () =>
    ['default', 'filled', 'outline', 'delete', 'cancel', 'minimal', 'link'].map(
        (variant) => (
            <>
                <es-button variant={variant} onClick={console.log}>
                    <es-icon icon={randomIcon()} slot={'before'} />
                    {`${variant} variant`}
                </es-button>
                <es-button variant={variant} onClick={console.log}>
                    <es-icon icon={randomIcon()} size={22} />
                </es-button>
                <es-button variant={variant} onClick={console.log} disabled>
                    <es-icon icon={randomIcon()} slot={'before'} />
                    {`${variant} (disabled)`}
                </es-button>
            </>
        ),
    );
```

```css
:host {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 20px;
    align-items: center;
    justify-items: center;
}
```



## Properties

| Property   | Attribute  | Description                                                                                                     | Type                                                                                | Default     |
| ---------- | ---------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------- |
| `disabled` | `disabled` | If the button is disabled. Prevents the user from interacting with the button: it cannot be pressed or focused. | `boolean \| undefined`                                                              | `undefined` |
| `type`     | `type`     | The default behavior of the button.                                                                             | `string`                                                                            | `'button'`  |
| `variant`  | `variant`  | Which styling variant to use.                                                                                   | `"cancel" \| "default" \| "delete" \| "filled" \| "link" \| "minimal" \| "outline"` | `'default'` |


## Slots

| Slot       | Description                                          |
| ---------- | ---------------------------------------------------- |
| `"after"`  | Placed after the main content with correct padding.  |
| `"before"` | Placed before the main content with correct padding. |


## Shadow Parts

| Part       | Description                                |
| ---------- | ------------------------------------------ |
| `"button"` | The internal button element.               |
| `"inner"`  | The inner span, wrapping the default slot. |


## CSS Custom Properties

| Name                    | Description                                                 |
| ----------------------- | ----------------------------------------------------------- |
| `--align-inner`         | The flex align of the button content.                       |
| `--background-color`    | Directly set the background color of the button.            |
| `--border-color`        | Directly set the border color of the button.                |
| `--border-radius`       | The border radius of the button.                            |
| `--border-width`        | The border width of the button.                             |
| `--focus-color`         | Sets the color of the outline on focus.                     |
| `--foreground-color`    | Directly set the foreground color of the button.            |
| `--primary-color`       | Sets the primary theming color                              |
| `--secondary-color`     | Sets the secondary theming color                            |
| `--spacing`             | Internal spacing of the button (padding and between slots). |
| `--tertiary-color`      | Sets the tertiary theming color                             |
| `--text-decoration`     | The text decoration of the button.                          |
| `--transition-duration` | The transition duration of the button.                      |


## Dependencies

### Used by

 - [es-pagination](../../es-pagination)
 - [es-table-nested](../../es-table-nested)
 - [es-thinking-button](../../es-thinking-button)

### Graph
```mermaid
graph TD;
  es-pagination --> es-button
  es-table-nested --> es-button
  es-thinking-button --> es-button
  style es-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


