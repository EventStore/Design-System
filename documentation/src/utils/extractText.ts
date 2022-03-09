import type { JSONOutput } from 'typedoc';

export const extractFullText = ({
    comment,
    signatures,
}: JSONOutput.DeclarationReflection): string => {
    const text = [];

    if (comment) {
        if (comment.shortText) text.push(comment.shortText);
        if (comment.text) text.push(comment.text);
    } else if (signatures?.length === 1) {
        const [{ comment }] = signatures;
        if (comment?.shortText) text.push(comment.shortText);
        if (comment?.text) text.push(comment.text);
    }

    return text.join('\n');
};

export const extractAbstract = ({
    comment,
    signatures,
}: JSONOutput.DeclarationReflection): string => {
    if (comment?.shortText) {
        return comment.shortText;
    }

    if (signatures?.length === 1) {
        const [{ comment }] = signatures;
        if (comment?.shortText) return comment.shortText;
    }

    return '';
};

export const extractBodyText = ({
    comment,
    signatures,
}: JSONOutput.DeclarationReflection): string => {
    if (comment?.text) {
        return comment.text;
    }

    if (signatures?.length === 1) {
        const [{ comment }] = signatures;
        if (comment?.text) return comment.text;
    }

    return '';
};
