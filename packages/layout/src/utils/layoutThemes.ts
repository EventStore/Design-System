import { addChildTheme } from '@eventstore-ui/theme';

/**
 * These css vaiables are automatically added via @eventstore-ui/theme.
 * @usage ./layoutThemes.usage.md
 */
export interface LayoutColorScheme {
    base: string;
    contrast: string;
    highlight: string;
    title: string;

    shade_10: string;
    shade_20: string;
    shade_30: string;
    shade_40: string;
    shade_50: string;
    shade_60: string;
    shade_70: string;
}

const lowContrast: LayoutColorScheme = {
    base: '#09264a',
    contrast: '#ffffff',
    highlight: '#5ab552',
    title: '#1976d2',

    shade_10: '#223c5c',
    shade_20: '#2e4665',
    shade_30: '#3a516e',
    shade_40: '#596c83',
    shade_50: '#95a1b1',
    shade_60: '#b6bec9',
    shade_70: '#ced4db',
};

const highContrast: LayoutColorScheme = {
    base: '#09264a',
    contrast: '#ffffff',
    highlight: '#77c271',
    title: '#ffffff',

    shade_10: '#09264a',
    shade_20: '#09264a',
    shade_30: '#09264a',
    shade_40: '#09264a',
    shade_50: '#09264a',
    shade_60: '#ffffff',
    shade_70: '#ffffff',
};

addChildTheme<LayoutColorScheme>('color-layout', {
    light: lowContrast,
    dark: lowContrast,
    high_contrast_light: highContrast,
    high_contrast_dark: highContrast,
});
