# es-backdrop



<!-- Auto Generated Below -->


## Usage

### Example

<!-- no-preview -->

```tsx usage.tsx
import { Uri, editor, languages } from '@eventstore/editor/monaco';
import { debounce } from '@eventstore/utils';

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
import '@eventstore/editor';

// import the monaco initialization code
import { initialize } from '@eventstore/editor/initialize';

// initialize the monaco library (with options, if required)
initialize();
```

```ts stencil.config.ts
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



## Properties

| Property    | Attribute | Description                                                                                                                                                      | Type                                                     | Default     |
| ----------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ----------- |
| `editorRef` | --        | An optional callback for getting a reference to the editor, for external control.                                                                                | `((editor: IStandaloneCodeEditor) => void) \| undefined` | `undefined` |
| `options`   | --        | Editor options. see [monaco docs](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html) for details. | `IStandaloneEditorConstructionOptions`                   | `{}`        |


## CSS Custom Properties

| Name              | Description                                     |
| ----------------- | ----------------------------------------------- |
| `--editor-height` | Sets the height of the editor. (default: 300px) |
| `--editor-width`  | Sets the width of the editor. (default: 100%)   |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
