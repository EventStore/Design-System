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
