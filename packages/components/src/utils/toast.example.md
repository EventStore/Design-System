```tsx
import { toast } from '@eventstore/components';
import { randomIcon } from 'helpers';

const success = () =>
    toast.success({
        title: 'Well done!',
        message: 'You are a success.',
    });

const info = () =>
    toast.info({
        title: 'For your information:',
        message: 'Clicking this toast will pop another.',
        onClick: info,
    });

const warning = () =>
    toast.warning({
        title: 'Warning!',
        message: 'This is a warning',
    });

const error = () =>
    toast.error({
        title: 'Error!',
        message: '500 internal server error',
    });

const clickToClose = async () => {
    const close = await toast.info({
        icon: randomIcon(),
        title: 'Long notification',
        message: 'Click to close.',
        duration: 20_000_000,
        onClick: () => close(),
    });
};

export default () => (
    <>
        <es-button onClick={success}>{'Success'}</es-button>
        <es-button onClick={info}>{'Info'}</es-button>
        <es-button onClick={warning}>{'Warning'}</es-button>
        <es-button onClick={error}>{'Error'}</es-button>
        <es-button onClick={clickToClose}>{'Dismiss'}</es-button>
    </>
);
```

```css
:host {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    align-items: center;
    align-content: center;
    justify-content: center;
    gap: 12px;
}
```
