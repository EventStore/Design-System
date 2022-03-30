import { readFileSync } from 'fs';
import { dirname, join, basename } from 'path';

import { Application, Converter, SignatureReflection, Context } from 'typedoc';

export const load = ({ converter }: Application) => {
    converter.on(Converter.EVENT_CREATE_DECLARATION, insertUsage);
    converter.on(Converter.EVENT_CREATE_SIGNATURE, insertUsage);
};

function insertUsage(_context: Context, reflection: SignatureReflection) {
    if (!reflection.comment?.hasTag('usage')) return;
    const [{ fileName }] = reflection.sources!;
    for (const tag of reflection.comment.tags) {
        if (tag.tagName !== 'usage') continue;
        const fullPath = join(dirname(fileName), tag.text.trim());
        const file = readFileSync(fullPath);
        tag.paramName = basename(tag.text.trim()).split('.').shift()!;
        tag.text = file.toString('utf-8');
    }
}
