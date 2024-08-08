import type * as monaco from '@eventstore-ui/monaco-editor';

export const MONACO = Symbol.for('monaco');

declare global {
    interface Window {
        [MONACO]: typeof monaco;
    }
}
