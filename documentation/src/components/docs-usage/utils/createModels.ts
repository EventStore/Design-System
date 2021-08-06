import { Uri, editor, languages } from '@eventstore/editor/monaco';
import { debounce } from '@eventstore/utils';

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

    const models = {
        render: editor.createModel(
            parts.render,
            undefined,
            Uri.parse('render.tsx'),
        ),
        css: editor.createModel(parts.css, undefined, Uri.parse('render.css')),
    };

    for (const [key, model] of Object.entries(models)) {
        model.onDidChangeContent(
            debounce(() => onChange(key, model.getValue()), 500),
        );
    }

    return models;
};
