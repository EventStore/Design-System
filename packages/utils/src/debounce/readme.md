# debounce

Debounce a function, only making the call if the passed timeout is reached.

| Argument | Description                               | Required |
| -------- | ----------------------------------------- | -------- |
| fn       | The function to debounce.                 | yes      |
| ms       | The amount of time to debounce by (in ms) | yes      |

Example:

```ts
import { debounce } from '@eventstore/utils';

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
import { debounce } from '@eventstore/utils';

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
import { debounce } from '@eventstore/utils';

const debouncedLog = debounce(console.log, 200);

debouncedLog('hello');
debouncedLog('hello');
debouncedLog('hello');
debouncedLog('hello');
debouncedLog.flush();

// console (Immediately)
// hello
```
