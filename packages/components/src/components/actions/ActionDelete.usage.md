```tsx
import { ActionDelete } from '@eventstore-ui/components';
import { createLogger } from '@kurrent-ui/utils';

const logger = createLogger('es-actions');

export default () => (
    <es-actions>
        <ActionDelete
            typeToConfirm
            description={'action-delete'}
            deleteItem={async () => logger.log('deleted!')}
            modal={{
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
