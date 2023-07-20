import { Uri, editor, languages } from '@eventstore-ui/editor/monaco';

import type { Parts, Models } from './types';

export const createModels = (parts: Parts): Models => {
    editor.getModels().forEach((model) => model.dispose());
    languages.typescript.typescriptDefaults.setCompilerOptions({
        jsx: languages.typescript.JsxEmit.Preserve,
    });
    languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
    });

    const models: Models = {};

    for (const { fileName, content } of Object.values(parts)) {
        models[fileName] = editor.createModel(
            content,
            undefined,
            Uri.parse(fileName),
        );
    }

    return models;
};
