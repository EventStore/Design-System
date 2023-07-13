import { readFileSync } from 'fs';
import { dirname, join } from 'path';

import {
    type Application,
    Converter,
    type SignatureReflection,
    type Context,
} from 'typedoc';

export const load = ({ converter }: Application) => {
    converter.on(Converter.EVENT_CREATE_DECLARATION, insertUsage);
    converter.on(Converter.EVENT_CREATE_SIGNATURE, insertUsage);
};

function insertUsage(_context: Context, reflection: SignatureReflection) {
    const tags = reflection.comment?.getTags('@usage');
    if (!tags || !tags.length) return;
    const [{ fileName }] = reflection.sources!;
    for (const tag of tags) {
        const tagIndex = tag.content.findIndex(({ kind }) => kind === 'text');
        const path = tag.content.at(tagIndex)!.text.trim();
        if (!path) continue;
        const fullPath = join(dirname(fileName), path);
        const file = readFileSync(fullPath);
        tag.content.at(tagIndex)!.text = file.toString('utf-8');
    }
}
