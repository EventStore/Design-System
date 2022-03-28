import type { SomeReflection } from './typedoc/types';

export const extractFullText = (refl: SomeReflection): string => {
    const text = [];
    const comment = refl.comment;

    if (comment) {
        if (comment.shortText) text.push(comment.shortText);
        if (comment.text) text.push(comment.text);
    } else if ('signatures' in refl && refl.signatures?.length === 1) {
        const [{ comment }] = refl.signatures;
        if (comment?.shortText) text.push(comment.shortText);
        if (comment?.text) text.push(comment.text);
    }

    return text.join('\n');
};

export const extractAbstract = (refl: SomeReflection): string => {
    const comment = refl.comment;

    if (comment?.shortText) {
        return comment.shortText;
    }

    if ('signatures' in refl && refl.signatures?.length === 1) {
        const [{ comment }] = refl.signatures;
        if (comment?.shortText) return comment.shortText;
    }

    return '';
};

export const extractBodyText = (refl: SomeReflection): string => {
    const comment = refl.comment;

    if (comment?.text) {
        return comment.text;
    }

    if ('signatures' in refl && refl.signatures?.length === 1) {
        const [{ comment }] = refl.signatures;
        if (comment?.text) return comment.text;
    }

    return '';
};
