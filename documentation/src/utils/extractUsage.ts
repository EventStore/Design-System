import type { DeclarationReflection } from 'typedoc';
import type { SomeReflection } from './typedoc/types';

export const extractUsage = (doc: SomeReflection): Record<string, string> =>
    [doc, ...((doc as DeclarationReflection).signatures ?? [])]
        .flatMap((signatures) => signatures.comment?.tags)
        .reduce<Record<string, string>>((acc, tag) => {
            if (!tag || tag.tagName !== 'usage') return acc;
            return {
                ...acc,
                [tag.paramName ?? doc.name]: tag.text,
            };
        }, {}) ?? {};
