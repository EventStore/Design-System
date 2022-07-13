# @eventstore-ui/router

Stencil router using only Functional Components.

## Install

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
yarn add @eventstore-ui/router
```

Also, include the peer dependencies:

```sh
yarn add @eventstore-ui/utils
```

## Usage within a stencil project

Initialize the router with your options, in the `componentWillLoad` of the root component.

```ts
import { router } from '@eventstore-ui/router';

@Component({
    tag: 'ui-root',
    styleUrl: 'root.css',
})
export class Root {
    componentWillLoad() {
        router.init({
            titleSuffix: ' - Event Store',
        });
    }
}
```

Import the functional components directly, and use them within your components:

```ts
import { Link } from '@eventstore-ui/router';
```
