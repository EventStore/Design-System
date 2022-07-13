import { Uri, editor, languages } from '@eventstore-ui/editor/monaco';
import { debounce } from '@eventstore-ui/utils';

import type { Parts, Models } from './types';

export const createModels = (
    parts: Parts,
    onChange: (key: string, value: string) => void,
): Models => {
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

    for (const [key, model] of Object.entries(models)) {
        model.onDidChangeContent(
            debounce(() => onChange(key, model.getValue()), 500),
        );
    }

    return models;
};
