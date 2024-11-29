# f2-hr

<!-- Auto Generated Below -->


## Overview

A footer for forms

## Usage

### Example

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
            documentation={'Use a form to space your fields'}
            placeholder={'Write something here'}
            {...form.connect('something')}
        />
        <f2-text-field
            label={'Another field'}
            documentation={"You can use it's submit to get formdata."}
            placeholder={'Type something here'}
            {...form.connect('something')}
        />
        <c2-button type={'submit'}>{'submit'}</c2-button>
    </f2-form>
);
```



----------------------------------------------


