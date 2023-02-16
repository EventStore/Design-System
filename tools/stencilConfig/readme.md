# Stencil config

Shared stencil config for use within the eventstore design system.

## exports

### `packageConfig`

Create a config for a stencil package.

Sets up standard output targets, postcss config, dev server

```
import { packageConfig } from '../../tools/stencilConfig';

export const config = packageConfig({
    namespace: 'es-my-lib',
});
```

### `flags`

A key value pair of the flags used to build

```
import { flags } from '../../tools/stencilConfig';

if (flags.dev) {
    console.log("hello");
}
```
