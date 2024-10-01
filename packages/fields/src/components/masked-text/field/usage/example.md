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
        <f2-masked-text-field
            label={'Something'}
            documentation={'Allows you to mask the text in an input'}
            mask={{ mask: '{#}000[aaa]/NIC-`*[**]' }}
            placeholder={'Something here'}
            {...form.connect('something')}
        />
        <f2-masked-text-field
            label={'Something else'}
            documentation={'Allows you to mask the text in an input'}
            mask={{
                mask: 'Ple\\ase fill ye\\ar: 19YY',
                lazy: false,
                blocks: {
                    YY: {
                        mask: '00',
                    },
                },
            }}
            placeholder={'Something else here please'}
            {...form.connect('somethingElse')}
        />
        <es-button type={'submit'}>{'submit'}</es-button>
    </f2-form>
);
```