```tsx
// Despite being intended to be used with `c2-action-with-confirmation` or
// `c2-button-with-confirmation, `c2-confirm-modal` can be used standalone.

import { createStore } from '@kurrent-ui/stores';

const { state } = createStore<{ open: boolean }>({
    open: false,
});

const requestClose = () => {
    state.open = false;
};

const deleteAndClose = () => {
    console.log('deleted!');
    state.open = false;
};

export default () => (
    <>
        <c2-portal
            backdrop
            open={state.open}
            onRequestClose={requestClose}
            renderElement={(h) => (
                <c2-confirm-modal
                    onRequestDeletion={deleteAndClose}
                    preHeading={'Group name'}
                    heading={'c2-action-delete'}
                    body={
                        'Deleting this group will remove it from your organization. This operation cannot be undone.'
                    }
                    warning={
                        'Are you sure you want to proceed in deleting this group?'
                    }
                    confirm={'Delete group'}
                />
            )}
        />
        <c2-button
            variant={'outline'}
            onClick={() => {
                state.open = true;
            }}
        >
            {'Open delete modal'}
        </c2-button>
    </>
);
```
