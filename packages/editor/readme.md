# @eventstore/editor

Monaco editor wrapped in a web component, with pre-built workers.

See [Monaco Editor](https://microsoft.github.io/monaco-editor/) for more information about usage.

## Set up within a Stencil project:

In your stencil config, add the workers to your [copy task](https://stenciljs.com/docs/copy-tasks#copy-tasks-for-output-targets).

```tsx
// import the path to the workers
import { workerPath } from '@eventstore/editor/configure';

export const config: Config = {
    // ...
    outputTargets: [
        {
            // ...
            copy: [
                // ...
                {
                    src: workerPath,
                    dest: 'workers',
                },
            ],
        },
    ],
};
```

In your `globalScript` file:

```tsx
// add the web components to the global pool
import '@eventstore/editor';

// import the monaco initialization code
import { initialize } from '@eventstore/editor/initialize';

// initialize the monaco library (with options, if required)
initialize();
```
