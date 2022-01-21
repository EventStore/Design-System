import { editor, Environment } from 'monaco-editor';
import { theme } from '@eventstore/theme';
import {
    ES_DARK,
    ES_HIGH_CONTRAST_DARK,
    ES_HIGH_CONTRAST_LIGHT,
} from './themes';

declare global {
    interface Window {
        MonacoEnvironment: Environment;
    }
}

export type { Environment } from 'monaco-editor';

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
