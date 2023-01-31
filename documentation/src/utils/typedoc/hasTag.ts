import type { Comment } from 'typedoc';

export const hasTag = (doc: { comment?: Comment }, tag: string) =>
    doc.comment?.blockTags?.some(
        (t) => t.tag === (tag.startsWith('@') ? tag : `@${tag}`),
    );
