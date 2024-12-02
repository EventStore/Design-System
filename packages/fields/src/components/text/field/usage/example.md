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
        <f2-text-field
            label={'Something'}
            documentation={'This a basic text input.'}
            placeholder={'Something here'}
            {...form.connect('something')}
        />
        <f2-text-field
            label={'Something else'}
            documentation={'It can be used to input text.'}
            placeholder={'Something else here please'}
            {...form.connect('somethingElse')}
        />
        <c2-button type={'submit'}>{'submit'}</c2-button>
    </f2-form>
);
```
