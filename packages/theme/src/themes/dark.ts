import type { ThemeDefinition } from '../types';

const colors = {
    cyan: '#3dd0ff',
    mid_blue: '#257fd7',
    light_blue: '#ddebf8',
    green: '#5ab552',
    mid_green: '#addaa9',
    light_green: '#d6ecd4',
    red: '#dc3813',
    light_red: '#fbebe7',
    orange: '#f8a71b',
    light_orange: '#feedd1',
    pink: '#ff52bc',
    navy: '#09264a',
    navy_10: '#223c5c',
    navy_20: '#2e4665',
    navy_30: '#3a516e',
    navy_40: '#596c83',
    navy_50: '#95a1b1',
    navy_60: '#b6bec9',
    grey_50: '#ced4db',
    dark_grey: '#435261',
    white: '#ffffff',
};

export const theme: ThemeDefinition = {
    title: 'Dark',
    name: 'dark',
    meta: {
        shade: 'dark',
        contrast: 'low',
    },
    prefix: 'color',
    scheme: {
        // basic
        background: colors.navy,
        contrast: colors.white,

        // text
        text: colors.grey_50,

        title_1: colors.cyan,
        title_2: colors.white,
        title_3: colors.white,

        // scheme
        primary: colors.cyan,
        primary_alt: colors.light_blue,
        primary_contrast: colors.navy,

        secondary: colors.green,
        secondary_alt: colors.light_green,
        secondary_contrast: colors.white,

        highlight: colors.pink,
        highlight_alt: colors.pink,
        highlight_contrast: colors.navy,

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

        info: colors.mid_blue,
        info_contrast: colors.navy,
        info_alt: colors.light_blue,
        info_alt_contrast: colors.dark_grey,

        // shades
        shade_10: colors.navy_10,
        shade_20: colors.navy_20,
        shade_30: colors.navy_30,
        shade_40: colors.navy_40,
        shade_50: colors.navy_50,
        shade_60: colors.navy_60,

        // special
        header: colors.navy,
        header_alt: colors.green,
        header_contrast: colors.white,

        overlay: colors.navy_60,
        overlay_alpha: 0.75,

        focus: colors.light_blue,
        disabled: colors.navy_20,
        disabled_border: colors.navy_20,
        disabled_contrast: colors.grey_50,
    },
};
