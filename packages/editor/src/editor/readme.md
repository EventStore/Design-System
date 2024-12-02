# e3-editor

<!-- Auto Generated Below -->


## Overview

Monaco editor wrapped in a web component. Handles re-layout on container resize

## Usage

### Example

<!-- no-preview -->

```tsx usage.tsx
import { Uri, editor, languages } from '@kurrent-ui/editor/monaco';
import { debounce } from '@kurrent-ui/utils';

// Create a model for the editor to use.
const model = editor.createModel('Hello!', undefined, Uri.parse('example.md'));

// Its a good idea to debounce your change function.
const onChange = debounce(() => console.log(model.getValue()), 500);

// Attach your change function directly to the model
model.onDidChangeContent(onChange);

// Pass your model to the web component
export default () => <e3-editor options={{ model }} />;
```

```tsx main.ts
// add the web components to the global pool
import '@kurrent-ui/editor';

// import the monaco initialization code
import { initialize } from '@kurrent-ui/editor/initialize';

// initialize the monaco library (with options, if required)
initialize();
```

```ts stencil.config.ts
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


