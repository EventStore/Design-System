# c2-action-with-confirmation

<!-- Auto Generated Below -->


## Overview

An action with a confirmation modal.

## Usage

### Example

```tsx
import { createLogger } from '@kurrent-ui/utils';

const logger = createLogger('c2-actions');

export default () => (
    <c2-actions>
        <c2-action-with-confirmation
            icon={'trash'}
            action={async () => logger.log('deleted!')}
            typeToConfirm={'I want to delete'}
            modal={{
                preHeading: 'Group name',
                heading: 'c2-action-confirmation',
                body: 'Deleting this group will remove it from your organization. This operation cannot be undone.',
                warning:
                    'Are you sure you want to proceed in deleting this group?',
                confirm: 'Delete group',
            }}
        >
            {'delete item'}
        </c2-action-with-confirmation>
    </c2-actions>
);
```



## Properties

| Property              | Attribute         | Description                                                                   | Type                                                    | Default     |
| --------------------- | ----------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------- | ----------- |
| `action` _(required)_ | --                | The action to take when the button is clicked.                                | `() => any`                                             | `undefined` |
| `disabled`            | `disabled`        | if the action should be disabled.                                             | `boolean`                                               | `false`     |
| `displayContent`      | `display-content` | If the action should display it's text content.                               | `boolean`                                               | `false`     |
| `dot`                 | `dot`             | If a dot should be shown on the action, to indicate attention being required. | `"error" \| "okay" \| "warning" \| undefined`           | `undefined` |
| `dropdownItem`        | `dropdown-item`   | If the action is within an `c2-action-dropdown`.                              | `boolean`                                               | `false`     |
| `icon` _(required)_   | `icon`            | The icon to show for the action.                                              | `[namespace: string \| symbol, name: string] \| string` | `undefined` |
| `modal` _(required)_  | --                | The text to display within the modal.                                         | `ConfirmModalOptions`                                   | `undefined` |
| `typeToConfirm`       | `type-to-confirm` | If the user needs to type the passed string to enable confirmation.           | `string \| undefined`                                   | `undefined` |


## Dependencies

### Depends on

- [c2-button](../../buttons/button)
- [c2-badge](../../badge)
- [c2-icon](../../icon)
- [c2-portal](../../portal)
- [c2-confirm-modal](../../modals/confirm-modal)

### Graph
```mermaid
graph TD;
  c2-action-with-confirmation --> c2-button
  c2-action-with-confirmation --> c2-badge
  c2-action-with-confirmation --> c2-icon
  c2-action-with-confirmation --> c2-portal
  c2-action-with-confirmation --> c2-confirm-modal
  c2-badge --> c2-counter
  c2-portal --> c2-backdrop
  c2-confirm-modal --> c2-modal
  c2-confirm-modal --> c2-popover
  c2-confirm-modal --> c2-button
  c2-modal --> c2-icon
  c2-popover --> c2-popper
  c2-popover --> c2-popper-inner
  c2-popover --> c2-popper-x
  c2-popover --> c2-popper-y
  style c2-action-with-confirmation fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


