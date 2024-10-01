```tsx
import { createValidatedForm } from '@eventstore-ui/forms';

interface Example {
    something: string;
    somethingElse: string;
}

const form = createValidatedForm<Example>({
    something: '',
    somethingElse: '',
});

const onSubmit = () => {
    form.submit((data) => {
        console.log(data);
    });
};

export default () => (
    <f2-form onSubmit={onSubmit}>
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
        <es-button type={'submit'}>{'submit'}</es-button>
    </f2-form>
);
```