```tsx
import { createLogger } from '@kurrent-ui/utils';

const logger = createLogger('c2-button-with-confirmation');

export default () => (
    <c2-button-with-confirmation
        variant={'delete'}
        action={() => logger.log('deleted!')}
        typeToConfirm={'I want to delete'}
        modal={{
            preHeading: 'Group name',
            heading: 'c2-button-confirmation',
            body: 'Deleting this group will remove it from your organization. This operation cannot be undone.',
            warning: 'Are you sure you want to proceed in deleting this group?',
            confirm: 'Delete group',
        }}
    >
        <c2-icon icon={'trash'} slot={'before'} />
        {'delete item'}
    </c2-button-with-confirmation>
);
```
