```tsx
import { createValidatedForm } from '@kurrent-ui/forms';

interface Example {
    something: string;
    somethingElse: string;
}

const form = createValidatedForm<Example>({
    something: '',
    somethingElse: '',
});

const handleSubmit = (e: Event) => {
    e.preventDefault();
    form.submit((data) => {
        console.log(data);
    });
};

export default () => (
    <f2-form onSubmit={handleSubmit}>
        <f2-text-input
            placeholder={'Something Else'}
            {...form.connect('somethingElse')}
        />
        <f2-text-input
            placeholder={'Something'}
            {...form.connect('something')}
        />
        <es-button type={'submit'}>{'submit'}</es-button>
    </f2-form>
);
```
