export type Color = string;
export interface ColorSet {
    extraLight?: Color;
    light?: Color;
    main?: Color;
    dark?: Color;
    extraDark?: Color;
    contrast?: Color;
}
export type ColorRange = Record<number, Color>;

export type Palette = Record<string, ColorSet | ColorRange | Color>;
