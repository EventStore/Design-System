import type { ThemeDefinition } from '../types';

const colors = {
    blue: '#1976d2',
    dark_blue: '#0d47a1',
    light_blue: '#ddebf8',
    green: '#5ab552',
    light_green: '#d6ecd4',
    purple: '#9214be',
    red: '#dc3813',
    light_red: '#fbebe7',
    orange: '#f8a71b',
    light_orange: '#feedd1',
    white: '#ffffff',
    grey_10: '#f9f9f9',
    grey_20: '#f6f6f6',
    grey_30: '#eeeeee',
    grey_40: '#e0e4e8',
    grey_50: '#ced4db',
    grey_60: '#b6bec9',
    dark_grey: '#435261',
    navy: '#09264a',
};

export const theme: ThemeDefinition = {
    title: 'Light',
    name: 'light',
    meta: {
        shade: 'light',
        contrast: 'low',
    },
    prefix: 'color',
    scheme: {
        // basic
        background: colors.white,
        contrast: colors.navy,

        // text
        text: colors.dark_grey,

        title_1: colors.blue,
        title_2: colors.navy,
        title_3: colors.navy,

        // scheme
        primary: colors.blue,
        primary_alt: colors.dark_blue,
        primary_contrast: colors.white,

        secondary: colors.green,
        secondary_alt: colors.light_green,
        secondary_contrast: colors.white,

        highlight: colors.purple,
        highlight_alt: colors.purple,
        highlight_contrast: colors.white,

        // levels
        error: colors.red,
        error_contrast: colors.white,
        error_alt: colors.light_red,
        error_alt_contrast: colors.dark_grey,

        warning: colors.orange,
        warning_contrast: colors.white,
        warning_alt: colors.light_orange,
        warning_alt_contrast: colors.dark_grey,

        success: colors.green,
        success_contrast: colors.white,
        success_alt: colors.light_green,
        success_alt_contrast: colors.dark_grey,

        info: colors.blue,
        info_contrast: colors.white,
        info_alt: colors.light_blue,
        info_alt_contrast: colors.dark_grey,

        // shades
        shade_10: colors.grey_10,
        shade_20: colors.grey_20,
        shade_30: colors.grey_30,
        shade_40: colors.grey_40,
        shade_50: colors.grey_50,
        shade_60: colors.grey_60,

        // special
        header: colors.navy,
        header_alt: colors.green,
        header_contrast: colors.white,

        overlay: colors.navy,
        overlay_alpha: 0.25,

        focus: colors.dark_blue,
        disabled: colors.grey_20,
        disabled_border: colors.grey_20,
        disabled_contrast: colors.dark_grey,
    },
};
