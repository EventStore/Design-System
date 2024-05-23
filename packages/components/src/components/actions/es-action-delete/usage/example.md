```tsx
import { createLogger } from '@eventstore-ui/utils';

const logger = createLogger('es-actions');

export default () => (
    <es-actions>
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
    </es-actions>
);
```
