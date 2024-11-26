```tsx
import { createValidatedForm } from '@kurrent-ui/forms';

interface Example {
    something: string;
    example: string;
}

const form = createValidatedForm<Example>({
    something: '',
    example: '',
});

const handleSubmit = (e: Event) => {
    e.preventDefault();

    console.log(new FormData(e.target as HTMLFormElement));

    form.submit((data) => {
        console.log(data);
    });
};

export default () => (
    <f2-form onSubmit={handleSubmit}>
        <f2-text-field
            label={'A field'}
            documentation={'Can be used as a horizontal rule'}
            placeholder={'Write something here'}
            {...form.connect('something')}
        />
        <f2-form-section-divider />
        <f2-text-field
            label={'Another field'}
            documentation={'Can be used as a section title'}
            placeholder={'Type something here'}
            {...form.connect('something')}
        />
        <f2-form-section-divider>{'Section Name'}</f2-form-section-divider>
        <f2-text-field
            label={'A field'}
            placeholder={'Write something here'}
            {...form.connect('something')}
        />
        <f2-text-field
            label={'Another field'}
            placeholder={'Type something here'}
            {...form.connect('something')}
        />
        <es-button type={'submit'}>{'submit'}</es-button>
    </f2-form>
);
```
