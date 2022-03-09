import type { JSONOutput } from 'typedoc';

export const hasTag = (doc: { comment?: JSONOutput.Comment }, tag: string) =>
    doc.comment?.tags?.some((t) => t.tag === tag);
