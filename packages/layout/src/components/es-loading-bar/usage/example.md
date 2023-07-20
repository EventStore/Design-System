```tsx
import { setProgress } from '@eventstore-ui/layout';
import { random } from 'utils/helpers';

const updateBarProgress = setProgress('example');

export default () => <es-loading-bar name={'example'} />;

const fakeProgress = (current: number) => {
    setTimeout(() => {
        if (current >= 60 && random(12) > 6) {
            return errorOut();
        }

        const next = current === 100 ? 0 : Math.min(current + random(20), 100);
        updateBarProgress(next);
        fakeProgress(next);
    }, 800);
};

const errorOut = () => {
    updateBarProgress(100, 'error');
    fakeProgress(0);
};

fakeProgress(0);
```
