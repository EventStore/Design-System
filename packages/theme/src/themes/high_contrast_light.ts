import type { ThemeDefinition } from '../types';

const colors = {
    contrast_dark_blue: '#13599e',
    contrast_dark_green: '#2f632a',
    contrast_dark_red: '#a72a0e',
    contrast_dark_orange: '#784c00',
    navy: '#09264a',
    white: '#ffffff',
};

export const theme: ThemeDefinition = {
    title: 'Light high contrast',
    name: 'high_contrast_light',
    meta: {
        shade: 'light',
        contrast: 'high',
    },
    prefix: 'color',
    scheme: {
        // basic
        background: colors.white,
        contrast: colors.navy,

        // text
        text: colors.navy,

        title_1: colors.navy,
        title_2: colors.navy,
        title_3: colors.navy,

        // scheme
        primary: colors.contrast_dark_blue,
        primary_alt: colors.navy,
        primary_contrast: colors.white,

        secondary: colors.contrast_dark_green,
        secondary_alt: colors.navy,
        secondary_contrast: colors.white,

        highlight: colors.navy,
        highlight_alt: colors.navy,
        highlight_contrast: colors.white,

        // levels
        error: colors.contrast_dark_red,
        error_contrast: colors.white,
        error_alt: colors.navy,
        error_alt_contrast: colors.white,

        warning: colors.contrast_dark_orange,
        warning_contrast: colors.white,
        warning_alt: colors.navy,
        warning_alt_contrast: colors.white,

        success: colors.contrast_dark_green,
        success_contrast: colors.white,
        success_alt: colors.navy,
        success_alt_contrast: colors.white,

        info: colors.contrast_dark_blue,
        info_contrast: colors.white,
        info_alt: colors.navy,
        info_alt_contrast: colors.white,

        // shades
        shade_10: colors.navy,
        shade_20: colors.navy,
        shade_30: colors.navy,
        shade_40: colors.navy,
        shade_50: colors.navy,
        shade_60: colors.navy,

        // special
        overlay: colors.white,
        overlay_alpha: 0.9,

        focus: colors.navy,

        disabled: colors.white,
        disabled_border: colors.navy,
        disabled_contrast: colors.navy,
    },
};
