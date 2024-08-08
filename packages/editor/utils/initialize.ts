import * as monaco from '@eventstore-ui/monaco-editor';
import { theme } from '@eventstore-ui/theme';
import { createLogger } from '@eventstore-ui/utils';

declare global {
    interface Window {
        [MONACO]: typeof monaco;
    }
}

const MONACO = Symbol.for('monaco');
const ES_DARK = 'es-dark';
const ES_HIGH_CONTRAST_DARK = 'es-high-contrast-dark';
const ES_HIGH_CONTRAST_LIGHT = 'es-high-contrast-light';

const logger = createLogger(
    '@eventstore-ui/editor',
    'linear-gradient(90deg, #A100FFFF 0%, #71C4FFFF 100%)',
);

/**
 * initialize the monaco editor.
 * By default it will set getWorkerUrl to return `/workers/<name>.worker.js`
 */
export const initialize = (
    environment: monaco.Environment = {
        getWorkerUrl(_moduleId: any, label: string) {
            if (label === 'json') {
                return '/workers/json.worker.js';
            }

            if (label === 'typescript' || label === 'javascript') {
                return '/workers/ts.worker.js';
            }

            if (label === 'css') {
                return '/workers/css.worker.js';
            }

            if (label === 'html') {
                return '/workers/html.worker.js';
            }

            return '/workers/editor.worker.js';
        },
    },
) => {
    if (self[MONACO] != null) {
        logger.error(
            'Initialize has already been called, make sure to only call it once.',
        );
        return;
    }

    self[MONACO] = monaco;
    self.MonacoEnvironment = environment;
    defineThemes();
    theme.onThemeChange(({ meta: { contrast, shade } }) => {
        if (contrast === 'high' && shade === 'dark') {
            monaco.editor.setTheme(ES_HIGH_CONTRAST_DARK);
        } else if (contrast === 'high' && shade === 'light') {
            monaco.editor.setTheme(ES_HIGH_CONTRAST_LIGHT);
        } else if (shade === 'dark') {
            monaco.editor.setTheme(ES_DARK);
        } else {
            monaco.editor.setTheme('vs');
        }
    }, true);
};

const defineThemes = () => {
    monaco.editor.defineTheme(ES_DARK, {
        base: 'vs-dark',
        inherit: true,
        rules: [{ token: '', foreground: 'd7dae0', background: '313440' }],
        colors: {
            'editor.foreground': '#d7dae0',
            'editor.background': '#313440',
        },
    });

    monaco.editor.defineTheme(ES_HIGH_CONTRAST_DARK, {
        base: 'hc-black',
        inherit: true,
        rules: [{ token: '', foreground: 'f8f8f2', background: '2b2b2b' }],
        colors: {
            'editor.foreground': '#f8f8f2',
            'editor.background': '#2b2b2b',
        },
    });

    monaco.editor.defineTheme(ES_HIGH_CONTRAST_LIGHT, {
        base: 'vs',
        inherit: true,
        rules: [{ token: '', foreground: '545454', background: 'fefefe' }],
        colors: {
            'editor.foreground': '#545454',
            'editor.background': '#fefefe',
        },
    });
};

export type { Environment } from '@eventstore-ui/monaco-editor';
