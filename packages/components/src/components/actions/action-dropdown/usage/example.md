```tsx
import { ActionCopy, ActionDelete } from '@kurrent-ui/components';
import { createLogger } from '@kurrent-ui/utils';

const logger = createLogger('c2-action-dropdown');

export default () => (
    <c2-actions>
        <c2-action-dropdown>
            <c2-action
                dropdownItem
                icon={'lightbulb'}
                action={() => logger.log('clicked generic action')}
            >
                {'Generic action'}
            </c2-action>
            <c2-action-link dropdownItem url={'/cheese'} icon={'info'}>
                {'Link action'}
            </c2-action-link>
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
        </c2-action-dropdown>
    </c2-actions>
);
```
