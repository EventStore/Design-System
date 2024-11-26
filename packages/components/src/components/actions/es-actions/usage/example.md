```tsx
import { ActionCopy, ActionDelete } from '@eventstore-ui/components';
import { createLogger } from '@kurrent-ui/utils';

const logger = createLogger('es-actions');

export default () => (
    <es-actions>
        <es-action
            icon={'lightbulb'}
            action={() => logger.log('clicked generic action')}
        >
            {'Generic action'}
        </es-action>
        <es-action-link url={'/cheese'} icon={'info'}>
            {'Link action'}
        </es-action-link>
        <ActionCopy
            value={'Hello Copy'}
            toast={{
                title: 'Copied!',
                message: 'Successfully copied "Hello Copy" to clipboard',
            }}
        >
            {'Copy name'}
        </ActionCopy>
        <ActionDelete
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
