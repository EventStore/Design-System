# createLogger

Create a standardised logger, and subscribe to logs. Used across Design System libraries.

| Argument   | Description                                                                                    | Required |
| ---------- | ---------------------------------------------------------------------------------------------- | -------- |
| name       | The name of your logger.                                                                       | yes      |
| background | A css background for your logger namespace. Allows it to be easily differentiated at a glance. |          |

Example:

```ts
import { createLogger } from '@eventstore/utils';
const logger = createLogger('Documentation', 'blue');

logger.log('hello');

// node
// [Documentation] hello

// browser (name has a 'blue' background)
// (Documentation) hello
```

## `logger`

The returned output of `createLogger`. Maps closely to `console`

| Method           | Description                  | Logs to console  | Calls subscriptions |
| ---------------- | ---------------------------- | ---------------- | ------------------- |
| `log`            | An info level log.           | development only | always              |
| `warn`           | An warn level log.           | development only | always              |
| `error`          | An error level log.          | always           | always              |
| `log.once`       | Logs at an info level once.  | development only | always              |
| `warn.once`      | Logs at an warn level once.. | development only | always              |
| `error.once`     | Logs at an error level once. | always           | always              |
| `groupCollapsed` | Start a collapsed log group. | development only |                     |
| `groupEnd`       | Close a log group            | development only |                     |

## `createLogger.subscribe`

Adds a subsciption to all calls to loggers. Returns an unsubscribe function. If a subscription throws an error, it will be silently ignored.

```ts
import { createLogger } from '@eventstore/utils';

const unsubscribe = createLogger.subscribe((logEvent) => {
    navigator.clipboard.writeText(JSON.stringify(logEvent));
});

const logger = createLogger('Documentation', 'blue');

logger.log('hello');

// subscription called with:
// {
//     level: 'info',
//     logger: 'Documentation',
//     message: ['hello'],
//     group: [],
// }

logger.groupCollapsed('my group');

logger.warn('hello again', { an: 'object' });

// subscription called with:
// {
//     level: 'warn',
//     message: ['hello again', { an: 'object' }],
//     logger: 'Documentation',
//     group: [['my group']],
// }

logger.groupEnd();

unsubscribe();
// subscription removed
```

**logEvent**

| Key     | Value                             | Description                                                                                   |
| ------- | --------------------------------- | --------------------------------------------------------------------------------------------- |
| level   | `'info'` or `'warn'` or `'error'` | The log level called.                                                                         |
| message | `any[]`                           | The arguments passed to the logging function.                                                 |
| logger  | `string`                          | Which logger was called.                                                                      |
| group   | `any[][]`                         | An array of the log groups the logger was called in, with the arguments passed to each group. |
