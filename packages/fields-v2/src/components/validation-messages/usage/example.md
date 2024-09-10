```tsx
export default () => (
    <f2-validation-messages
        messages={{
            error: ['Oh no!'],
            warning: ['Watch out!', "It's hot!"],
            info: [
                'It will cool down soon.',
                (h) => <es-button>{'hello'}</es-button>,
            ],
        }}
    />
);
```
