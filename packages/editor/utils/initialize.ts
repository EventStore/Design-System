import * as monaco from '@kurrent-ui/monaco-editor';
import { addChildTheme, theme } from '@kurrent-ui/theme';
import { createLogger } from '@kurrent-ui/utils';

declare global {
    interface Window {
        [MONACO]: typeof monaco;
    }
}

const MONACO = Symbol.for('monaco');

const logger = createLogger(
    '@kurrent-ui/editor',
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
};

export interface CodeColorScheme {
    fg: string;
    bg: string;
    literal: string;
    symbol: string;
    keyword: string;
    string: string;
    error: string;
    variable: string;
    class: string;
    comment: string;
}

export const codeTheme = {
    // one light
    light: {
        fg: '#383a42',
        bg: '#fffffe',
        literal: '#0184bc',
        symbol: '#4078f2',
        keyword: '#a626a4',
        string: '#50a14f',
        error: '#e45649',
        variable: '#986801',
        class: '#c18401',
        comment: '#6f7f90',
    },
    // one dark
    dark: {
        fg: '#d7dae0',
        bg: '#313440',
        literal: '#E5C07B',
        symbol: '#56B6C2',
        keyword: '#C678DD',
        string: '#98C379',
        error: '#E05252',
        variable: '#E06C75',
        class: '#E5C07B',
        comment: '#5C6370',
    },
    // a11y syntax highlighting (light)
    high_contrast_light: {
        fg: '#545454',
        bg: '#fefefe',
        literal: '#aa5d00',
        symbol: '#008000',
        keyword: '#7928a1',
        string: '#008000',
        error: '#d91e18',
        variable: '#d91e18',
        class: '#aa5d00',
        comment: '#696969',
    },
    // a11y syntax highlighting (dark)
    high_contrast_dark: {
        fg: '#f8f8f2',
        bg: '#2b2b2b',
        literal: '#f5ab35',
        symbol: '#abe338',
        keyword: '#dcc6e0',
        string: '#abe338',
        error: '#ffa07a',
        variable: '#ffa07a',
        class: '#f5ab35',
        comment: '#d4d0ab',
    },
};

const K_LIGHT = 'k-light';
const K_DARK = 'k-dark';
const K_HIGH_CONTRAST_LIGHT = 'k-high-contrast-light';
const K_HIGH_CONTRAST_DARK = 'k-high-contrast-dark';

const defineTheme = (
    themeName: string,
    base: monaco.editor.BuiltinTheme,
    scheme: CodeColorScheme,
) =>
    monaco.editor.defineTheme(themeName, {
        base,
        inherit: true,
        rules: [
            {
                foreground: scheme.fg.replace('#', ''),
                background: scheme.bg.replace('#', ''),
                token: '',
            },
        ],
        colors: {
            'editor.foreground': scheme.fg,
            'editor.background': scheme.bg,
        },
    });

const defineThemes = () => {
    addChildTheme<CodeColorScheme>('code', codeTheme);

    defineTheme(K_LIGHT, 'vs', codeTheme.light);
    defineTheme(K_DARK, 'vs-dark', codeTheme.dark);
    defineTheme(
        K_HIGH_CONTRAST_LIGHT,
        'hc-light',
        codeTheme.high_contrast_light,
    );
    defineTheme(K_HIGH_CONTRAST_DARK, 'hc-black', codeTheme.high_contrast_dark);

    theme.onThemeChange(({ meta: { contrast, shade } }) => {
        if (contrast === 'high' && shade === 'dark') {
            monaco.editor.setTheme(K_HIGH_CONTRAST_DARK);
        } else if (contrast === 'high' && shade === 'light') {
            monaco.editor.setTheme(K_HIGH_CONTRAST_LIGHT);
        } else if (shade === 'dark') {
            monaco.editor.setTheme(K_DARK);
        } else {
            monaco.editor.setTheme(K_LIGHT);
        }
    }, true);
};

export type { Environment } from '@kurrent-ui/monaco-editor';
