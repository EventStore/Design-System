import type { ChildThemeDefinition, ThemeDefinition } from '../types';

const themeToVars = ({
    scheme,
    prefix,
}: ThemeDefinition | ChildThemeDefinition) =>
    Object.entries(scheme).map(
        ([key, value]) => `--${prefix}-${key.replace(/_/g, '-')}: ${value};`,
    );

export const applyTheme = (
    theme: ThemeDefinition,
    childThemes: ChildThemeDefinition[],
) => {
    const $head = document.querySelector('head');
    if (!$head) throw 'No head element. Unable to apply theme.';

    const $theme =
        $head.querySelector<HTMLStyleElement>('style[data-theme]') ??
        createStyleSheet($head);

    const colorVars = [];

    colorVars.push(...themeToVars(theme));

    for (const childTheme of childThemes) {
        colorVars.push(...themeToVars(childTheme));
    }

    $theme.innerHTML = `
:root {
    color-scheme: ${theme.meta.shade};

    --theme-name: ${theme.name};
    --theme-shade: ${theme.meta.shade};
    --theme-contrast: ${theme.meta.contrast};

    ${colorVars.join('\n    ')}
}

body {
    background-color: var(--color-background);
    color: var(--color-text);
}
    `;
};

const createStyleSheet = ($head: HTMLHeadElement) => {
    const stylesheet = document.createElement('style');
    stylesheet.setAttribute('data-theme', '');
    $head.prepend(stylesheet);
    return stylesheet;
};
