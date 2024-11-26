```tsx
import { createLogger } from '@kurrent-ui/utils';

const logger = createLogger('es-button-with-confirmation');

export default () => (
    <es-button-with-confirmation
        variant={'delete'}
        action={() => logger.log('deleted!')}
        typeToConfirm={'I want to delete'}
        modal={{
            preHeading: 'Group name',
            heading: 'es-button-confirmation',
            body: 'Deleting this group will remove it from your organization. This operation cannot be undone.',
            warning: 'Are you sure you want to proceed in deleting this group?',
            confirm: 'Delete group',
        }}
    >
        <es-icon icon={'trash'} slot={'before'} />
        {'delete item'}
    </es-button-with-confirmation>
);
```
