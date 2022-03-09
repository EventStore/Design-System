import md from 'markdown-it';
import type { Settings } from './types';

export const extractPartsFromMarkdown = (markdown: string): Settings => {
    const settings: Settings = {
        preview: true,
        code: true,
        grow: false,
        showLocation: false,
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

        const comment = content.match(/<!-- ([A-Za-z0-9 _-]*) -->/g);
        if (!comment) continue;

        for (const match of comment) {
            const inner = match.match(
                /<!-- ([A-Za-z0-9_-]*)\s?([A-Za-z0-9_-]*) -->/,
            );

            switch (inner?.[1]) {
                case 'no-preview': {
                    settings.preview = false;
                    settings.parts['usage.tsx'].hidden = true;
                    settings.parts['style.css'].hidden = true;
                    break;
                }
                case 'no-code': {
                    settings.code = false;
                    break;
                }
                case 'grow': {
                    settings.grow = inner[2] ? Number.parseInt(inner[2]) : 500;
                    break;
                }
                case 'show-location': {
                    settings.showLocation = true;
                    break;
                }
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
