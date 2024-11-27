```tsx
import { ActionDelete } from '@kurrent-ui/components';
import { createLogger } from '@kurrent-ui/utils';

const logger = createLogger('c2-actions');

export default () => (
    <c2-actions>
        <ActionDelete
            typeToConfirm
            description={'action-delete'}
            deleteItem={async () => logger.log('deleted!')}
            modal={{
                preHeading: 'Group name',
                heading: 'c2-action-delete',
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
    </c2-actions>
);
```
