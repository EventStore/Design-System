```tsx
import { createLogger } from '@eventstore-ui/utils';

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
        <es-action-copy
            value={'es-action-copy'}
            toast={{
                title: 'Copied!',
                message: 'Successfully copied "es-action-copy" to clipboard',
            }}
        >
            {'Copy name'}
        </es-action-copy>
        <es-action-delete
            description={'es-action-delete'}
            deleteItem={async () => logger.log('deleted!')}
            modalText={{
                preHeading: 'Group name',
                heading: 'es-action-delete',
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
            <es-action-copy
                dropdownItem
                value={'es-action-copy'}
                toast={{
                    title: 'Copied!',
                    message:
                        'Successfully copied "es-action-copy" to clipboard',
                }}
            >
                {'Copy name'}
            </es-action-copy>
            <es-action-delete
                dropdownItem
                description={'es-action-delete'}
                deleteItem={async () => logger.log('deleted!')}
                modalText={{
                    preHeading: 'Group name',
                    heading: 'es-action-delete',
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
