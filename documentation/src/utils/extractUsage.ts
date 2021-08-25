import type { JSONOutput } from 'typedoc';

export const extractUsage = (
    doc: JSONOutput.DeclarationReflection,
): Record<string, string> =>
    [doc, ...(doc.signatures ?? [])]
        .flatMap((signatures) => signatures.comment?.tags)
        .reduce<Record<string, string>>((acc, tag) => {
            if (!tag || tag.tag !== 'usage') return acc;
            return {
                ...acc,
                [tag.param ?? doc.name]: tag.text,
            };
        }, {}) ?? {};
