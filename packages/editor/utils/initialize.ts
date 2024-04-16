import * as monaco from 'monaco-editor';
import { theme } from '@eventstore-ui/theme';
import {
    ES_DARK,
    ES_HIGH_CONTRAST_DARK,
    ES_HIGH_CONTRAST_LIGHT,
} from './themes';

const MONACO = Symbol.for('monaco');
const MONACO_EDITOR = Symbol.for('monaco-editor');

declare global {
    interface Window {
        MonacoEnvironment: monaco.Environment;
        [MONACO]: typeof monaco;
        [MONACO_EDITOR]: typeof monaco.editor;
    }
}

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
    self[MONACO] = monaco;
    self.MonacoEnvironment = environment;

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

export type { Environment } from 'monaco-editor';
