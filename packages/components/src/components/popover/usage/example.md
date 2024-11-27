```tsx
import { createStore } from '@kurrent-ui/stores';
import type { FieldChange } from '@kurrent-ui/fields';

interface PopoverStore {
    open: boolean;
    arrow: boolean;
    autoSize: HTMLC2PopoverElement['autoSize'];
    constrain: HTMLC2PopoverElement['constrain'];
    placement: HTMLC2PopoverElement['placement'];
    offset: number;
}

const { state } = createStore<PopoverStore>({
    open: true,
    arrow: true,
    autoSize: 'none',
    constrain: 'none',
    placement: 'top',
    offset: 16,
});

export default () => (
    <>
        <f2-form class={'options'}>
            <f2-checkbox
                name={'open'}
                value={state.open}
                onFieldchange={fieldChange}
            >
                {'Open'}
            </f2-checkbox>
            <f2-checkbox
                name={'arrow'}
                value={state.arrow}
                onFieldchange={fieldChange}
            >
                {'Arrow'}
            </f2-checkbox>
            <f2-select-field
                name={'autoSize'}
                label={'autoSize'}
                options={constrainOptions}
                value={state.autoSize}
                onFieldchange={fieldChange}
            />
            <f2-select-field
                name={'constrain'}
                label={'constrain'}
                options={constrainOptions}
                value={state.constrain}
                onFieldchange={fieldChange}
            />
            <f2-select-field
                name={'placement'}
                label={'placement'}
                options={placement}
                value={state.placement}
                onFieldchange={fieldChange}
            />
            <f2-number-field
                label={'offset'}
                placeholder={'How much offset'}
                unit={'px'}
                name={'offset'}
                value={state.offset.toString()}
                onFieldchange={fieldChange}
            />
        </f2-form>
        <div class={'wrapper'}>
            <div class={'attachment'}>
                {'Attachment element'}
                <c2-popover
                    open={state.open}
                    arrow={state.arrow}
                    autoSize={state.autoSize}
                    constrain={state.constrain}
                    placement={state.placement}
                    offset={state.offset}
                >
                    <div class={'popper'}>{'popover'}</div>
                </c2-popover>
            </div>
        </div>
    </>
);

const fieldChange = (e: CustomEvent<FieldChange<unknown>>) => {
    const { name, value } = e.detail;
    // dont do this
    (state as any)[name] = value;
};

const constrainOptions = [
    { value: 'none', name: 'none' },
    { value: 'width', name: 'width' },
    { value: 'height', name: 'height' },
    { value: 'both', name: 'both' },
];

const placement = [
    { value: 'top', name: 'top' },
    { value: 'top-start', name: 'top-start' },
    { value: 'top-end', name: 'top-end' },
    { value: 'right', name: 'right' },
    { value: 'right-start', name: 'right-start' },
    { value: 'right-end', name: 'right-end' },
    { value: 'bottom', name: 'bottom' },
    { value: 'bottom-start', name: 'bottom-start' },
    { value: 'bottom-end', name: 'bottom-end' },
    { value: 'left', name: 'left' },
    { value: 'left-start', name: 'left-start' },
    { value: 'left-end', name: 'left-end' },
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
    height: 100vh;
}

.attachment {
    background-color: orange;
    padding: 20px;
    display: flex;
    align-items: center;
}

.inner {
    opacity: 0;
    transition: opacity 400ms ease;
    background-color: skyblue;
    box-shadow: none;
    position: relative;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.inner.entered {
    opacity: 1;
}

.arrow::after {
    background-color: red;
}

.options {
    width: 300px;
    border: 1px solid var(--color-shade-30);
    padding: 10px;
    border-radius: 20px;
    justify-self: flex-end;
    height: 100vh;
}
```
