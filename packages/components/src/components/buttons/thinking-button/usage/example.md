```tsx
import { toast } from '@kurrent-ui/components';
import { random, delay } from 'utils/helpers';

type CoinToss = 'heads' | 'tails';

const play = (user: CoinToss) => async () => {
    toast.info({
        title: 'The coin is tossed!',
        message: `User calls ${user}.`,
        icon: user,
        duration: 2000,
    });

    // flip the coin
    await delay(2000);

    const result: CoinToss = random(1) ? 'heads' : 'tails';

    if (user === result) {
        toast.success({
            title: `The coin lands ${result} side up!`,
            message: 'The user wins',
            icon: result,
            duration: 2000,
        });
        return true;
    }

    toast.error({
        title: `The coin lands ${result} side up!`,
        message: 'The user loses',
        icon: result,
        duration: 2000,
    });

    throw new Error('You lose.');
};

export default () => (
    <>
        <c2-thinking-button
            text={'Heads'}
            defaultIcon={'heads'}
            action={play('heads')}
        />
        <c2-thinking-button
            text={'Tails'}
            defaultIcon={'tails'}
            action={play('tails')}
        />
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
