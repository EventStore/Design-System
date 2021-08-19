import md from 'markdown-it';
import { Settings } from './types';

export const extractPartsFromMarkdown = (markdown: string): Settings => {
    const settings: Settings = {
        preview: true,
        parts: {
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
        },
    };

    const parsed = md().parse(markdown, {});

    for (const { tag, content } of parsed) {
        if (tag) continue;

        const comment = content.trim().match(/^<!-- ([A-Za-z_-]*) -->$/);
        switch (comment?.[1]) {
            case 'no-preview': {
                settings.preview = false;
                settings.parts['usage.tsx'].hidden = true;
                settings.parts['style.css'].hidden = true;
                break;
            }
        }
    }

    for (const { tag, info, content } of parsed) {
        if (tag !== 'code') continue;

        const [lang, fileName, ...modifiers] = info.split(' ');

        if (!fileName || fileName === 'hidden') {
            if (/(t|j)sx?/.test(lang)) {
                settings.parts['usage.tsx'].content = content;
                settings.parts['usage.tsx'].hidden = fileName === 'hidden';
            } else if (/css/.test(lang)) {
                settings.parts['style.css'].content = content;
                settings.parts['style.css'].hidden = fileName === 'hidden';
            }
        } else {
            settings.parts[fileName] = {
                fileName,
                title: fileName,
                hidden: modifiers.includes('hidden'),
                content,
            };
        }
    }

    return settings;
};
