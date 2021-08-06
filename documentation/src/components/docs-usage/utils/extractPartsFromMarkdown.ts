import md from 'markdown-it';
import { Parts } from './types';

export const extractPartsFromMarkdown = (markdown: string) => {
    const parts: Parts = {
        render: '',
        css: '/* no content */',
    };

    for (const { tag, info, content } of md().parse(markdown, {})) {
        if (tag !== 'code') continue;

        if (/(t|j)sx?/.test(info)) {
            parts.render = content;
        } else if (/css/.test(info)) {
            parts.css = content;
        }
    }

    return parts;
};
