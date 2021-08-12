import MagicString from 'magic-string';
import type { Plugin } from 'rollup';

const escape = (str: string) => str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');

const longest = (a: string, b: string) => b.length - a.length;

function mapToFunctions(object: Record<string, string>) {
    return Object.keys(object).reduce<Record<string, () => string>>(
        (fns, key) => {
            fns[key] = () => object[key];
            return fns;
        },
        {},
    );
}

export function replace(options: Record<string, string> = {}): Plugin {
    const functionValues = mapToFunctions(options);
    const keys = Object.keys(functionValues).sort(longest).map(escape);
    const lookahead = '(?!\\s*=[^=])';
    const pattern = new RegExp(
        `\\b(${keys.join('|')})\\b(?!\\.)${lookahead}`,
        'g',
    );

    return {
        name: 'replace',
        renderChunk(code) {
            if (!keys.length) return null;
            return executeReplacement(code);
        },
        transform(code) {
            if (!keys.length) return null;
            return executeReplacement(code);
        },
    };

    function executeReplacement(code: string) {
        const magicString = new MagicString(code);

        if (!codeHasReplacements(code, magicString)) {
            return null;
        }

        return {
            code: magicString.toString(),
            map: magicString.generateMap({ hires: true }),
        };
    }

    function codeHasReplacements(code: string, magicString: MagicString) {
        let result = false;
        let match;

        while ((match = pattern.exec(code))) {
            result = true;

            const start = match.index;
            const end = start + match[0].length;
            const replacement = String(functionValues[match[1]]());
            magicString.overwrite(start, end, replacement);
        }
        return result;
    }
}
