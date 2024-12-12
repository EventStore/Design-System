import { palette } from './palette';
import type { BaseScheme } from '../types';

// 22 steps between black and powder_blue, in oklab
const shades = {
    // #000000
    // #000000
    // #010102
    // #030505
    // #080b0d <--
    // #0f1315
    shade_10: '#161c1e',
    shade_20: '#1e2528',
    shade_30: '#262e31',
    shade_40: '#2e383b',
    shade_50: '#364146',
    shade_60: '#3f4c50',
    // #48565b
    // #516066
    // #5a6b72
    // #64767d
    // #6d8189
    // #778c95
    // #8198a1
    // #8ba3ad
    // #95afb9
    // #9fbbc6
};

export const dark: BaseScheme = {
    // basic
    background: palette.powder_black,
    foreground: palette.powder_blue,

    title: palette.powder_blue,
    title_contrast: palette.powder_black,

    highlight: palette.seaglass_green,
    highlight_contrast: palette.powder_black,

    link: palette.pacific_blue,
    link_contrast: palette.powder_black,

    focus: palette.electric_lilac,
    focus_contrast: palette.powder_black,

    // levels
    error: palette.coral,
    error_contrast: palette.powder_black,
    error_alt: palette.plum,
    error_alt_contrast: palette.white,

    warning: palette.sunflower,
    warning_contrast: palette.powder_black,
    warning_alt: palette.olive_green,
    warning_alt_contrast: palette.white,

    success: palette.seaglass_green,
    success_contrast: palette.powder_black,
    success_alt: palette.dark_cyan,
    success_alt_contrast: palette.white,

    info: palette.pacific_blue,
    info_contrast: palette.powder_black,
    info_alt: palette.cobalt_night,
    info_alt_contrast: palette.white,

    // shades
    ...shades,

    // special
    overlay: palette.dark_cyan,
    overlay_alpha: 0.75,

    disabled: shades.shade_20,
    disabled_border: shades.shade_20,
    disabled_contrast: palette.powder_blue,
};
