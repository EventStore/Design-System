import { palette } from './palette';
import type { BaseScheme } from '../types';

// 22 steps between foreground and background, in oklab
const shades = {
    // #000000
    // #000000
    // #010102
    // #030505
    // #080b0d
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
    background: palette.black,
    foreground: palette.powder_blue,

    title: palette.powder_blue,
    title_contrast: palette.black,

    highlight: palette.seaglass_green,
    highlight_contrast: palette.black,

    link: palette.pacific_blue,
    link_contrast: palette.black,

    focus: palette.electric_lilac,
    focus_contrast: palette.black,

    // levels
    error: palette.coral,
    error_contrast: palette.black,
    error_alt: palette.dusty_rose,
    error_alt_contrast: palette.black,

    warning: palette.sunflower,
    warning_contrast: palette.black,
    warning_alt: palette.maize_yellow,
    warning_alt_contrast: palette.black,

    success: palette.seaglass_green,
    success_contrast: palette.black,
    success_alt: palette.powder_blue,
    success_alt_contrast: palette.black,

    info: palette.pacific_blue,
    info_contrast: palette.black,
    info_alt: palette.sky_blue,
    info_alt_contrast: palette.black,

    // shades
    ...shades,

    // special
    overlay: palette.dark_cyan,
    overlay_alpha: 0.75,

    disabled: shades.shade_20,
    disabled_border: shades.shade_20,
    disabled_contrast: palette.powder_blue,
};
