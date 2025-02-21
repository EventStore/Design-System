```tsx
import { createValidatedForm } from '@kurrent-ui/forms';

interface Example {
    notifications: boolean;
    maintenance: boolean;
}

const form = createValidatedForm<Example>({
    notifications: true,
    maintenance: false,
});

export default () => (
    <f2-form>
        <f2-switch-field
            label={'Enable notifications'}
            documentation={
                'Receive real-time updates and alerts about system events'
            }
            {...form.connect('notifications')}
        />
        <f2-switch-field
            disabled
            label={'Maintenance mode'}
            documentation={'This field is disabled'}
            {...form.connect('maintenance')}
        />
    </f2-form>
);
```
