import { editor } from 'monaco-editor';

export const ES_DARK = 'es-dark';

editor.defineTheme(ES_DARK, {
    base: 'vs-dark',
    inherit: true,
    rules: [{ token: '', foreground: 'd7dae0', background: '313440' }],
    colors: {
        'editor.foreground': '#d7dae0',
        'editor.background': '#313440',
    },
});

export const ES_HIGH_CONTRAST_DARK = 'es-high-contrast-dark';
editor.defineTheme(ES_HIGH_CONTRAST_DARK, {
    base: 'hc-black',
    inherit: true,
    rules: [{ token: '', foreground: 'f8f8f2', background: '2b2b2b' }],
    colors: {
        'editor.foreground': '#f8f8f2',
        'editor.background': '#2b2b2b',
    },
});

export const ES_HIGH_CONTRAST_LIGHT = 'es-high-contrast-light';
editor.defineTheme(ES_HIGH_CONTRAST_LIGHT, {
    base: 'vs',
    inherit: true,
    rules: [{ token: '', foreground: '545454', background: 'fefefe' }],
    colors: {
        'editor.foreground': '#545454',
        'editor.background': '#fefefe',
    },
});
