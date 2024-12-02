# `debounce`

Debounce a function, only making the call if the passed timeout is reached.

| Argument | Description                               | Required |
| -------- | ----------------------------------------- | -------- |
| fn       | The function to debounce.                 | yes      |
| ms       | The amount of time to debounce by (in ms) | yes      |

Example:

```ts
import { debounce } from '@kurrent-ui/utils';

const debouncedLog = debounce(console.log, 200);

debouncedLog('hello');
debouncedLog('hello');
debouncedLog('hello');
debouncedLog('hello');

// console (After 200ms)
// hello
```

## `Debounce.clear`

Cancels the queued function call.

Example:

```ts
import { debounce } from '@kurrent-ui/utils';

const debouncedLog = debounce(console.log, 200);

debouncedLog('hello');
debouncedLog('hello');
debouncedLog('hello');
debouncedLog('hello');
debouncedLog.clear();

// console (Nothing logged)
```

## `Debounce.flush`

Immediately calls the queued function call.

Example:

```ts
import { debounce } from '@kurrent-ui/utils';

const debouncedLog = debounce(console.log, 200);

debouncedLog('hello');
debouncedLog('hello');
debouncedLog('hello');
debouncedLog('hello');
debouncedLog.flush();

// console (Immediately)
// hello
```

# `rateLimit`

Rate Limit a function, ignoring subsiquent calls until the timeout has passed.

| Argument | Description                                      | Required |
| -------- | ------------------------------------------------ | -------- |
| fn       | The function to rate limit.                      | yes      |
| ms       | The minimum amount of time between calls (in ms) | yes      |

Example:

```ts
import { rateLimit } from '@kurrent-ui/utils';
const rateLimitedLog = rateLimit(console.log, 200);

for (let i = 0; i < 1000; i++) {
    rateLimitedLog(`Hello ${i}`);
    await delay(50);
}
// console
// Hello 0
// Hello 4
// Hello 9
// Hello 13
// Hello 17
// etc..
```

## `RateLimit.clear`

Cancels the queued function call.
Example:

```ts
import { rateLimit } from '@kurrent-ui/utils';
const rateLimitedLog = rateLimit(console.log, 200);
rateLimitedLog('hello');
rateLimitedLog('hello');
rateLimitedLog('hello');
rateLimitedLog('hello');
debouncedLog.clear();
// console (Nothing logged)
```

## `RateLimit.flush`

Immediately calls the queued function call.
Example:

```ts
import { rateLimit } from '@kurrent-ui/utils';
const rateLimitedLog = rateLimit(console.log, 200);
rateLimitedLog('hello');
rateLimitedLog('hello');
rateLimitedLog('hello');
rateLimitedLog('hello');
rateLimitedLog.flush();
// console (Immediately)
// hello
```
