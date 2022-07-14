<!-- no-preview -->

```tsx usage.tsx
import { Uri, editor, languages } from '@eventstore-ui/editor/monaco';
import { debounce } from '@eventstore-ui/utils';

// Create a model for the editor to use.
const model = editor.createModel('Hello!', undefined, Uri.parse('example.md'));

// Its a good idea to debounce your change function.
const onChange = debounce(() => console.log(model.getValue()), 500);

// Attach your change function directly to the model
model.onDidChangeContent(onChange);

// Pass your model to the web component
export default () => <es-editor options={{ model }} />;
```

```tsx main.ts
// add the web components to the global pool
import '@eventstore-ui/editor';

// import the monaco initialization code
import { initialize } from '@eventstore-ui/editor/initialize';

// initialize the monaco library (with options, if required)
initialize();
```

```ts stencil.config.ts
import { workerPath } from '@eventstore-ui/editor/configure';

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
