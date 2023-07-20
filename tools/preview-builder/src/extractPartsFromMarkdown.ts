import md from 'markdown-it';
import type { Settings } from './types';

export const extractPartsFromMarkdown = (markdown: string): Settings => {
    const settings: Settings = {
        preview: true,
        grow: false,
        showLocation: false,
        files: {},
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

        const [lang, fileName] = info.split(' ');

        if (fileName && fileName !== 'hidden') {
            settings.files[fileName] = {
                fileName,
                content,
            };
        } else if (/(t|j)sx?/.test(lang)) {
            settings.usage = `
/* eslint-disable */
import { h${content.includes('</>') ? ', Fragment' : ''} } from '@stencil/core';
${content}`;
        } else if (/css/.test(lang) && content.trim().length) {
            settings.styles = content;
        }
    }

    return settings;
};
