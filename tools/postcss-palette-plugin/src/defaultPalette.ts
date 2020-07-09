import { Palette } from './types';

export const palette: Palette = {
    primary: {
        light: '#536881',
        main: '#09254a',
        dark: '#435261',
        contrast: 'var(--color-white)',
    },
    secondary: {
        light: '#acd9a9',
        main: '#5bb553',
        dark: '#3c8235',
        contrast: 'var(--color-white)',
    },

    error: {
        extraLight: '#fbebe7',
        light: '#ff8564',
        main: '#dc3813',
        dark: '#c32908',
        contrast: 'var(--color-white)',
    },
    warning: {
        extraLight: '#feedd1',
        light: '#ea7b04',
        main: '#f49608',
        dark: '#f7b54e',
        contrast: 'var(--color-white)',
    },
    success: {
        extraLight: '#e6f4e5',
        light: '#addaa9',
        main: '#5ab552',
        dark: '#45943e',
        contrast: 'var(--color-white)',
    },
    info: {
        extraLight: '#e8f1fa',
        light: '#e8f1fa',
        main: '#1976d2',
        dark: '#435261',
        contrast: 'var(--color-white)',
    },

    grey: {
        50: '#fafafa',
        100: '#f6f6f6',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#cccccc',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
    },

    white: 'white',
    black: 'black',

    text: 'var(--color-grey-600)',
    heading: '#1976d2',
};
