---
'@eventstore-ui/editor': major
---

Monaco editor has been moved to a seperate package: `@eventstore-ui/monaco-editor`.

## Breaking changes:

### `assetsPath`

You must now also copy `assetsPath` as well as `workersPath`, into your served assets.

```ts
import * as editor from '@eventstore-ui/editor/configure';

// ...

                {
                    src: editor.assetsPath,
                    dest: 'assets',
                },
                {
                    src: editor.workerPath,
                    dest: 'workers',
                },
 // ...
```

### `IStandaloneEditorConstructionOptions`

`es-editor`'s options prop may required different arguments, due to changes in monaco's `IStandaloneEditorConstructionOptions`

### `codeTheme`

Child theme `codeTheme` has been removed, and is no-longer added to the global theme.
