import marked, { Renderer } from 'marked';
import { Parts } from './types';

const parser = new DOMParser();

function* extractComments(document: Document) {
    const nodeIterator = document.createNodeIterator(
        document,
        NodeFilter.SHOW_COMMENT,
    );

    while (true) {
        const comment = nodeIterator.nextNode();
        if (!comment) break;
        if (!comment.textContent) continue;
        yield comment.textContent;
    }
}

const renderer: Partial<Renderer> = {
    code(code, info = '') {
        const [lang, modifier] = info.split(' ');

        switch (lang) {
            case 'js':
            case 'jsx':
            case 'ts':
            case 'tsx':
                return `<script type="${
                    modifier ?? 'render'
                }">${code}</script>`;
            case 'css':
                return `<script type="${modifier ?? 'css'}">${code}</script>`;
            default:
                return '';
        }
    },
};

marked.use({ renderer });

const css = `\
:host {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
`;

export const extractPartsFromMarkdown = (markdown: string): Parts => {
    const html = marked(markdown);
    const document = parser.parseFromString(html, 'text/html');

    const parts: Record<string, string> = {};

    for (const script of Array.from(document.scripts)) {
        switch (script.type) {
            case 'render': {
                parts.render = script.innerText;
                break;
            }
            case 'css': {
                parts.css = script.innerText;
                break;
            }
            default: {
                // eslint-disable-next-line no-console
                console.log(script);
                break;
            }
        }
    }

    for (const comment of extractComments(document)) {
        const [label, ...content] = comment.split('\n');
        parts[label.trim()] = content.join('\n');
    }

    return {
        render: `<>\n${parts.render}\n</>`,
        css: parts.css ?? css,
        setup: parts.setup ?? '',
    };
};
