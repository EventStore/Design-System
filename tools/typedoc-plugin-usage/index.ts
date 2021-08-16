import { readFileSync } from 'fs';
import { dirname, join, basename } from 'path';

import { Application, Converter, Reflection } from 'typedoc';
import { Context } from 'typedoc/dist/lib/converter';

export const load = ({ converter }: Application) => {
    converter.on(
        Converter.EVENT_CREATE_DECLARATION,
        (_context: Context, reflection: Reflection) => {
            if (!reflection.comment?.hasTag('usage')) return;

            for (const tag of reflection.comment.tags) {
                if (tag.tagName !== 'usage') continue;
                const [{ fileName }] = reflection.sources!;
                const fullPath = join(dirname(fileName), tag.text.trim());
                const file = readFileSync(fullPath);
                tag.paramName = basename(tag.text.trim()).split('.').shift()!;
                tag.text = file.toString('utf-8');
            }
        },
    );
};
