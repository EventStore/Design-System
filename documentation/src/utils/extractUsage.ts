import type { DeclarationReflection } from 'typedoc';
import type { SomeReflection } from './typedoc/types';

export const extractUsage = (doc: SomeReflection): Record<string, string> =>
    [doc, ...((doc as DeclarationReflection).signatures ?? [])]
        .flatMap((signatures) => signatures.comment?.blockTags)
        .reduce<Record<string, string>>((acc, tag) => {
            if (!tag || tag.tag !== '@usage') return acc;
            return {
                ...acc,
                [doc.name]: tag.content.map(({ text }) => text).join('') ?? '',
            };
        }, {}) ?? {};
