import type { ThemeDefinition } from '../types';

const colors = {
    cyan: '#3dd0ff',
    contrast_light_green: '#77c271',
    contrast_light_red: '#f69883',
    orange: '#f8a71b',
    white: '#ffffff',
    navy: '#09264a',
};

export const theme: ThemeDefinition = {
    title: 'Dark high contrast',
    name: 'high_contrast_dark',
    meta: {
        shade: 'dark',
        contrast: 'high',
    },
    prefix: 'color',
    scheme: {
        background: colors.navy,
        contrast: colors.white,

        // text
        text: colors.white,

        title_1: colors.white,
        title_2: colors.white,
        title_3: colors.white,

        // scheme
        primary: colors.cyan,
        primary_alt: colors.white,
        primary_contrast: colors.navy,

        secondary: colors.contrast_light_green,
        secondary_alt: colors.white,
        secondary_contrast: colors.navy,

        highlight: colors.white,
        highlight_alt: colors.white,
        highlight_contrast: colors.navy,

        // levels
        error: colors.contrast_light_red,
        error_contrast: colors.navy,
        error_alt: colors.white,
        error_alt_contrast: colors.navy,

        warning: colors.orange,
        warning_contrast: colors.navy,
        warning_alt: colors.white,
        warning_alt_contrast: colors.navy,

        success: colors.contrast_light_green,
        success_contrast: colors.navy,
        success_alt: colors.white,
        success_alt_contrast: colors.navy,

        info: colors.cyan,
        info_contrast: colors.navy,
        info_alt: colors.white,
        info_alt_contrast: colors.navy,

        // shades
        shade_10: colors.white,
        shade_20: colors.white,
        shade_30: colors.white,
        shade_40: colors.white,
        shade_50: colors.white,
        shade_60: colors.white,

        // special
        overlay: colors.navy,
        overlay_alpha: 0.9,

        focus: colors.white,

        disabled: colors.navy,
        disabled_border: colors.white,
        disabled_contrast: colors.white,
    },
};
