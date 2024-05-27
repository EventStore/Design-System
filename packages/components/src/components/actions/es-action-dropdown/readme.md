# es-action-dropdown

<!-- Auto Generated Below -->


## Overview

A dropdown to display more actions than can be reasonably fit in a row.
All child actions must have the `dropdownItem` prop set.

## Usage

### Example

```tsx
import { ActionCopy, ActionDelete } from '@eventstore-ui/components';
import { createLogger } from '@eventstore-ui/utils';

const logger = createLogger('es-action-dropdown');

export default () => (
    <es-actions>
        <es-action-dropdown>
            <es-action
                dropdownItem
                icon={'lightbulb'}
                action={() => logger.log('clicked generic action')}
            >
                {'Generic action'}
            </es-action>
            <es-action-link dropdownItem url={'/cheese'} icon={'info'}>
                {'Link action'}
            </es-action-link>
            <ActionCopy
                dropdownItem
                value={'Hello Copy'}
                toast={{
                    title: 'Copied!',
                    message: 'Successfully copied "Hello Copy" to clipboard',
                }}
            >
                {'Copy name'}
            </ActionCopy>
            <ActionDelete
                dropdownItem
                description={'ActionDelete'}
                deleteItem={async () => logger.log('deleted!')}
                modal={{
                    preHeading: 'Group name',
                    heading: 'ActionDelete',
                    body: 'Deleting this group will remove it from your organization. This operation cannot be undone.',
                    warning:
                        'Are you sure you want to proceed in deleting this group?',
                    confirm: 'Delete group',
                }}
                toast={{
                    title: 'Group deleted',
                    message: 'Successfully deleted',
                }}
            />
        </es-action-dropdown>
    </es-actions>
);
```



## Properties

| Property   | Attribute  | Description                         | Type                                                    | Default                    |
| ---------- | ---------- | ----------------------------------- | ------------------------------------------------------- | -------------------------- |
| `disabled` | `disabled` | If the dropdown should be disabled. | `boolean`                                               | `false`                    |
| `icon`     | `icon`     | The icon to show for the action.    | `[namespace: string \| symbol, name: string] \| string` | `[ICON_NAMESPACE, 'more']` |


## Dependencies

### Depends on

- [es-button](../../buttons/es-button)
- [es-icon](../../es-icon)
- [es-popover](../../es-popover)

### Graph
```mermaid
graph TD;
  es-action-dropdown --> es-button
  es-action-dropdown --> es-icon
  es-action-dropdown --> es-popover
  es-popover --> es-popper
  es-popover --> es-popper-inner
  es-popover --> es-popper-x
  es-popover --> es-popper-y
  style es-action-dropdown fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


