```tsx
import { createStore } from '@kurrent-ui/stores';

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

        <c2-badge color={'error'} count={state.error}>
            <c2-button onClick={() => (state.error += 1)}>{'Error'}</c2-button>
        </c2-badge>

        <c2-badge color={'warning'} count={state.warning}>
            <c2-button onClick={() => (state.warning += 1)}>
                {'Warning'}
            </c2-button>
        </c2-badge>

        <c2-badge color={'okay'} count={state.okay}>
            <c2-button onClick={() => (state.okay += 1)}>{'Okay'}</c2-button>
        </c2-badge>

        {/* variants */}

        <c2-badge color={'error'} count={state.error} variant={'outline'}>
            <c2-icon icon={'cog'} />
        </c2-badge>

        <c2-badge color={'warning'} count={state.warning} showZero>
            <c2-icon icon={'cog'} />
        </c2-badge>

        <c2-badge color={'okay'} count={state.okay} variant={'minimal'}>
            <c2-icon icon={'cog'} />
        </c2-badge>

        {/* dot */}

        <c2-badge variant={'dot'} color={'error'} count={state.error}>
            <c2-button variant={'outline'} onClick={() => (state.error += 1)}>
                {'Error'}
            </c2-button>
        </c2-badge>

        <c2-badge variant={'dot'} color={'warning'} count={state.warning}>
            <c2-button variant={'outline'} onClick={() => (state.warning += 1)}>
                {'Warning'}
            </c2-button>
        </c2-badge>

        <c2-badge variant={'dot'} color={'okay'} count={state.okay}>
            <c2-button variant={'outline'} onClick={() => (state.okay += 1)}>
                {'Okay'}
            </c2-button>
        </c2-badge>
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
