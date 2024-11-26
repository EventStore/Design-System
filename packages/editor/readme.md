# @kurrent-ui/editor

Monaco editor wrapped in a web component, with pre-built workers.

See [Monaco Editor](https://microsoft.github.io/monaco-editor/) for more information about usage.

### Add to your project

```sh
yarn add @kurrent-ui/editor
```

Also, include the peer dependencies:

```sh
yarn add @eventstore-ui/components @eventstore-ui/utils
```

## Set up within a Stencil project:

In your stencil config, add the workers to your [copy task](https://stenciljs.com/docs/copy-tasks#copy-tasks-for-output-targets).

```tsx
// import the path to the workers
import { workerPath } from '@kurrent-ui/editor/configure';

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
// Add the core web components to the global pool
import '@eventstore-ui/components';
// add the editor web components to the global pool
import '@kurrent-ui/editor';

// import the monaco initialization code
import { initialize } from '@kurrent-ui/editor/initialize';

// initialize the monaco library (with options, if required)
initialize();
```
