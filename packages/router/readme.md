# @kurrent-ui/router

Stencil router using only Functional Components.

## Install

### Add to your project

```sh
yarn add @kurrent-ui/router
```

Also, include the peer dependencies:

```sh
yarn add @kurrent-ui/utils
```

## Usage within a stencil project

Initialize the router with your options, in the `componentWillLoad` of the root component.

```ts
import { router } from '@kurrent-ui/router';

@Component({
    tag: 'ui-root',
    styleUrl: 'root.css',
})
export class Root {
    componentWillLoad() {
        router.init({
            titleSuffix: ' - Kurrent',
        });
    }
}
```

Import the functional components directly, and use them within your components:

```ts
import { Link } from '@kurrent-ui/router';
```
