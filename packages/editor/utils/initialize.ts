import { editor, languages, type Environment } from 'monaco-editor';
import { theme } from '@eventstore-ui/theme';
import {
    ES_DARK,
    ES_HIGH_CONTRAST_DARK,
    ES_HIGH_CONTRAST_LIGHT,
} from './themes';

const MONACO_EDITOR = Symbol.for('monaco-editor');
const MONACO_LANGUAGES = Symbol.for('monaco-languages');

declare global {
    interface Window {
        MonacoEnvironment: Environment;
        [MONACO_EDITOR]: typeof editor;
        [MONACO_LANGUAGES]: typeof languages;
    }
}

/**
 * initialize the monaco editor.
 * By default it will set getWorkerUrl to return `/workers/<name>.worker.js`
 */
export const initialize = (
    environment: Environment = {
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
    self[MONACO_EDITOR] = editor;
    self[MONACO_LANGUAGES] = languages;
    self.MonacoEnvironment = environment;

    theme.onThemeChange(({ meta: { contrast, shade } }) => {
        if (contrast === 'high' && shade === 'dark') {
            editor.setTheme(ES_HIGH_CONTRAST_DARK);
        } else if (contrast === 'high' && shade === 'light') {
            editor.setTheme(ES_HIGH_CONTRAST_LIGHT);
        } else if (shade === 'dark') {
            editor.setTheme(ES_DARK);
        } else {
            editor.setTheme('vs');
        }
    }, true);
};

export type { Environment } from 'monaco-editor';
