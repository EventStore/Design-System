```tsx
import { createLogger } from '@eventstore-ui/utils';

const logger = createLogger('es-actions');

export default () => (
    <es-actions>
        <es-action-with-confirmation
            icon={'trash'}
            action={async () => logger.log('deleted!')}
            typeToConfirm={'I want to delete'}
            modal={{
                preHeading: 'Group name',
                heading: 'es-action-confirmation',
                body: 'Deleting this group will remove it from your organization. This operation cannot be undone.',
                warning:
                    'Are you sure you want to proceed in deleting this group?',
                confirm: 'Delete group',
            }}
        >
            {'delete item'}
        </es-action-with-confirmation>
    </es-actions>
);
```
