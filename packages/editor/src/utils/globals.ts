import type * as monaco from 'monaco-editor';

export const MONACO = Symbol.for('monaco');

declare global {
    interface Window {
        MonacoEnvironment: monaco.Environment;
        [MONACO]: typeof monaco;
    }
}
