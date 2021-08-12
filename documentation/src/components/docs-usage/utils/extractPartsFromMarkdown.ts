import md from 'markdown-it';
import { Parts } from './types';

export const extractPartsFromMarkdown = (markdown: string) => {
    const parts: Parts = {
        'usage.tsx': {
            fileName: 'usage.tsx',
            title: 'Render',
            hidden: false,
            content: '/* no content */',
        },
        'style.css': {
            fileName: 'style.css',
            title: 'Style',
            hidden: false,
            content: '/* no content */',
        },
    };

    for (const { tag, info, content } of md().parse(markdown, {})) {
        if (tag !== 'code') continue;

        const [lang, fileName, ...modifiers] = info.split(' ');

        if (!fileName || fileName === 'hidden') {
            if (/(t|j)sx?/.test(lang)) {
                parts['usage.tsx'].content = content;
                parts['usage.tsx'].hidden = fileName === 'hidden';
            } else if (/css/.test(lang)) {
                parts['style.css'].content = content;
                parts['style.css'].hidden = fileName === 'hidden';
            }
        } else {
            parts[fileName] = {
                fileName,
                title: fileName,
                hidden: modifiers.includes('hidden'),
                content,
            };
        }
    }

    return parts;
};
