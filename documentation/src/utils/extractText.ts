import type { SomeReflection } from './typedoc/types';

export const extractText = (refl: SomeReflection): string => {
    const text = [];
    const comment = refl.comment;

    if (comment) {
        text.push(comment.summary.map(({ text }) => text).join(''));
    } else if ('signatures' in refl && refl.signatures?.length === 1) {
        const [{ comment }] = refl.signatures;
        if (comment) {
            text.push(comment.summary.map(({ text }) => text).join(''));
        }
    }

    return text.join('\n');
};
