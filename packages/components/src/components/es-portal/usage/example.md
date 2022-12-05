```tsx
import { FunctionalComponent } from '@stencil/core';
import { createStore } from '@eventstore-ui/stores';

const { state } = createStore<{ open: boolean }>({
    open: true,
});

export default () => (
    <>
        <es-portal
            backdrop
            open={state.open}
            onRequestClose={requestClose}
            renderElement={(h) => <ExampleModal requestClose={requestClose} />}
        />
        <es-button
            variant={'outline'}
            onClick={() => {
                state.open = true;
            }}
        >
            {'Open portal'}
        </es-button>
    </>
);

const requestClose = () => {
    state.open = false;
};

const ExampleModal: FunctionalComponent = ({ requestClose }) => (
    <>
        <style>
            {`
                .important {
                    color: var(--color-error);
                }

                .cancel {
                    --current-color: var(--color-shade-30);
                    --contrast-color: var(--color-white);

                    --text-color: var(--color-text);
                }

                .delete {
                    --current-color: var(--color-error);
                    --contrast-color: var(--color-white);
                }
            `}
        </style>
        <es-modal role={'alert'}>
            <h2 slot={'header'}>{'Project name'}</h2>
            <h1 slot={'header'}>{'Production'}</h1>
            <p>
                {
                    'Deleting this project will delete all associated clusters and networks. This operation cannot be undone.'
                }
            </p>
            <p class={'important'}>
                {'Are you sure you want to proceed in deleting this project?'}
            </p>
            <es-button
                variant={'outline'}
                slot={'footer'}
                class={'cancel'}
                onClick={requestClose}
            >
                {'Cancel'}
            </es-button>
            <es-button
                variant={'outline'}
                slot={'footer'}
                class={'delete'}
                onClick={requestClose}
            >
                {'Delete project'}
            </es-button>
        </es-modal>
    </>
);
```

```css
:host {
    display: flex;
    align-items: center;
    justify-content: center;
}
```
