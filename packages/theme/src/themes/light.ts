import { palette } from './palette';
import type { BaseScheme } from '../types';

// 24 steps between white and dark cyan, in oklab
const shades = {
    // #ffffff
    shade_10: '#f5f8f9',
    shade_20: '#ecf1f3',
    shade_30: '#e3eaed',
    shade_40: '#d9e3e8',
    shade_50: '#d0dce2',
    // #c7d5dc
    // #bdced6
    shade_60: '#b4c8d1',
    // #abc1cb
    // #a2bac5
    // #99b3bf
    // #90adba
    // #87a6b4
    // #7ea0af
    // #7599a9
    // #6d93a3
    // #648c9e
    // #5b8698
    // #527f93
    // #49798d
    // #3f7388
    // #366c82
    // #2c667d
};

export const light: BaseScheme = {
    // basic
    background: palette.white,
    foreground: palette.black,

    title: palette.plum,
    title_contrast: palette.white,

    highlight: palette.plum,
    highlight_contrast: palette.white,

    link: palette.pacific_blue,
    link_contrast: palette.white,

    focus: palette.electric_lilac,
    focus_contrast: palette.white,

    // levels
    error: palette.dusty_rose,
    error_contrast: palette.white,
    error_alt: palette.rose,
    error_alt_contrast: palette.black,

    warning: palette.olive_green,
    warning_contrast: palette.white,
    warning_alt: palette.sunbeam,
    warning_alt_contrast: palette.black,

    success: palette.dark_cyan,
    success_contrast: palette.white,
    success_alt: palette.mint_green,
    success_alt_contrast: palette.black,

    info: palette.cobalt_night,
    info_contrast: palette.white,
    info_alt: palette.pale_blue,
    info_alt_contrast: palette.black,

    // shades
    ...shades,

    // special
    overlay: palette.lavender_gray,
    overlay_alpha: 0.75,

    disabled: shades.shade_20,
    disabled_border: shades.shade_20,
    disabled_contrast: palette.black,
};
