import md from 'markdown-it';
import anchor from 'markdown-it-anchor';

const parser = md().use(anchor);

export interface Anchor {
    id: string;
    name: string;
    level: number;
}
export const extractAnchors = (markdown: string) => {
    const anchors: Anchor[] = [];

    const parsed = parser.parse(markdown, {});

    for (const [i, token] of parsed.entries()) {
        if (
            token.type !== 'heading_open' ||
            token.tag === 'h1' ||
            !token.attrGet('id')
        ) {
            continue;
        }
        const { content } = parsed[i + 1];

        anchors.push({
            id: token.attrGet('id')!,
            name: content,
            level: parseInt(token.tag.replace('h', '')),
        });
    }

    return anchors;
};
