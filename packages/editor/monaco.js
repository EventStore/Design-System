const MONACO_EDITOR = Symbol.for('monaco-editor');
const MONACO_LANGUAGES = Symbol.for('monaco-languages');
export const editor = window[MONACO_EDITOR];
export const languages = window[MONACO_LANGUAGES];
