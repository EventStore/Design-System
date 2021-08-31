# @eventstore/editor

Monaco editor wrapped in a web component, with pre-built workers.

See [Monaco Editor](https://microsoft.github.io/monaco-editor/) for more information about usage.

### Log in to github packages

```sh
$ npm login --registry=https://npm.pkg.github.com
> Username: USERNAME
> Password: TOKEN
> Email: PUBLIC-EMAIL-ADDRESS
```

`TOKEN` can be obtained from https://github.com/settings/tokens and requires `repo` and `read:packages` permissions

### Add to your project

```sh
yarn add @eventstore/editor
```

Also, include the peer dependencies:

```sh
yarn add @eventstore/components @eventstore/utils
```

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
// Add the core web components to the global pool
import '@eventstore/components';
// add the editor web components to the global pool
import '@eventstore/editor';

// import the monaco initialization code
import { initialize } from '@eventstore/editor/initialize';

// initialize the monaco library (with options, if required)
initialize();
```
