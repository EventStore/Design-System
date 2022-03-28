import type { Comment } from 'typedoc';

export const hasTag = (doc: { comment?: Comment }, tag: string) =>
    doc.comment?.tags?.some((t) => t.tagName === tag);
