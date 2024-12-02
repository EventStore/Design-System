```tsx
import { toast } from '@kurrent-ui/components';
import { randomIcon } from 'utils/helpers';

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
        <c2-button onClick={success}>{'Success'}</c2-button>
        <c2-button onClick={info}>{'Info'}</c2-button>
        <c2-button onClick={warning}>{'Warning'}</c2-button>
        <c2-button onClick={error}>{'Error'}</c2-button>
        <c2-button onClick={clickToClose}>{'Dismiss'}</c2-button>
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
