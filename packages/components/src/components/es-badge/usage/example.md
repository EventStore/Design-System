```tsx
import { createStore } from '@eventstore-ui/stores';

interface CountStore {
    error: number;
    warning: number;
    okay: number;
}

const { state } = createStore<CountStore>({
    error: 1,
    warning: 0,
    okay: 1000,
});

export default () => (
    <>
        {/* counters */}

        <es-badge color={'error'} count={state.error}>
            <es-button onClick={() => (state.error += 1)}>{'Error'}</es-button>
        </es-badge>

        <es-badge color={'warning'} count={state.warning}>
            <es-button onClick={() => (state.warning += 1)}>
                {'Warning'}
            </es-button>
        </es-badge>

        <es-badge color={'okay'} count={state.okay}>
            <es-button onClick={() => (state.okay += 1)}>{'Okay'}</es-button>
        </es-badge>

        {/* variants */}

        <es-badge color={'error'} count={state.error} variant={'outline'}>
            <es-icon icon={'cog'} />
        </es-badge>

        <es-badge color={'warning'} count={state.warning} showZero>
            <es-icon icon={'cog'} />
        </es-badge>

        <es-badge color={'okay'} count={state.okay} variant={'minimal'}>
            <es-icon icon={'cog'} />
        </es-badge>

        {/* dot */}

        <es-badge variant={'dot'} color={'error'} count={state.error}>
            <es-button variant={'outline'} onClick={() => (state.error += 1)}>
                {'Error'}
            </es-button>
        </es-badge>

        <es-badge variant={'dot'} color={'warning'} count={state.warning}>
            <es-button variant={'outline'} onClick={() => (state.warning += 1)}>
                {'Warning'}
            </es-button>
        </es-badge>

        <es-badge variant={'dot'} color={'okay'} count={state.okay}>
            <es-button variant={'outline'} onClick={() => (state.okay += 1)}>
                {'Okay'}
            </es-button>
        </es-badge>
    </>
);
```

```css
:host {
    display: grid;
    grid-template-columns: auto auto auto;
    gap: 40px;
    align-items: center;
    justify-items: center;
    justify-content: center;
    align-content: center;
}
```
