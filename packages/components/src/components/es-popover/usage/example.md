```tsx
import { createStore } from '@eventstore/stores';
import { debounce } from '@eventstore/utils';

interface PopoverStore {
    open: boolean;
    constrain: HTMLESPopoverElement['constrain'];
    positionY: HTMLESPopoverElement['positionY'];
    positionX: HTMLESPopoverElement['positionX'];
    attachmentY: HTMLESPopoverElement['attachmentY'];
    attachmentX: HTMLESPopoverElement['attachmentX'];
    offsetY: number;
    offsetX: number;
}

const { state } = createStore<PopoverStore>({
    open: true,
    constrain: 'none',
    positionY: 'top',
    positionX: 'right',
    attachmentY: 'bottom',
    attachmentX: 'left',
    offsetY: 0,
    offsetX: 0,
});

export default () => (
    <>
        <div class={'options'}>
            <es-checkbox
                name={'open'}
                value={state.open}
                onFieldchange={fieldChange}
            >
                {'Open'}
            </es-checkbox>
            <es-select
                name={'constrain'}
                label={'constrain'}
                options={constrainOptions}
                value={state.constrain}
                onFieldchange={fieldChange}
            />
            <es-select
                name={'positionY'}
                label={'positionY'}
                options={yLocations}
                value={state.positionY}
                onFieldchange={fieldChange}
            />
            <es-select
                name={'positionX'}
                label={'positionX'}
                options={xLocations}
                value={state.positionX}
                onFieldchange={fieldChange}
            />
            <es-select
                name={'attachmentY'}
                label={'attachmentY'}
                options={yLocations}
                value={state.attachmentY}
                onFieldchange={fieldChange}
            />
            <es-select
                name={'attachmentX'}
                label={'attachmentX'}
                options={xLocations}
                value={state.attachmentX}
                onFieldchange={fieldChange}
            />
            <es-number-input
                label={'offsetY'}
                unit={'px'}
                name={'offsetY'}
                value={state.offsetY}
                onFieldchange={fieldChange}
            />
            <es-number-input
                label={'offsetX'}
                unit={'px'}
                name={'offsetX'}
                value={state.offsetX}
                onFieldchange={fieldChange}
            />
        </div>
        <div class={'wrapper'}>
            <div class={'attachment'}>
                {'Attachment element'}
                <es-popover
                    open={state.open}
                    constrain={state.constrain}
                    positionY={state.positionY}
                    positionX={state.positionX}
                    attachmentY={state.attachmentY}
                    attachmentX={state.attachmentX}
                    offsetY={state.offsetY}
                    offsetX={state.offsetX}
                >
                    <div class={'popper'}>{'popover'}</div>
                </es-popover>
            </div>
        </div>
    </>
);

const fieldChange = (e) => {
    const { name, value } = e.detail;
    state[name] = value;
};

const constrainOptions = [
    { value: 'none', name: 'none' },
    { value: 'width', name: 'width' },
    { value: 'height', name: 'height' },
    { value: 'both', name: 'both' },
];

const yLocations = [
    { value: 'top', name: 'top' },
    { value: 'middle', name: 'middle' },
    { value: 'bottom', name: 'bottom' },
];

const xLocations = [
    { value: 'right', name: 'right' },
    { value: 'middle', name: 'middle' },
    { value: 'left', name: 'left' },
];
```

```css
:host {
    display: flex;
    align-items: flex-start;
    width: 100%;
    padding: 0;
}

.wrapper {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.attachment {
    background-color: orange;
    padding: 20px;
    display: flex;
    align-items: center;
}

.inner {
    width: 100%;
    height: 100%;
}

.popper {
    background-color: skyblue;
    width: 100%;
    height: 100%;
    padding: 5px;
}

.options {
    width: 300px;
    border: 1px solid var(--color-grey-200);
    padding: 10px;
    border-radius: 20px;
    justify-self: flex-end;
    height: 100vh;
}

es-select,
es-number-input {
    --field-grid-columns: [before] 100px [input] 150px [after] 0px;
}

es-checkbox {
    --field-grid-columns: [before] 100px [input] 24px [label] 1fr [after] 0;
}
```
