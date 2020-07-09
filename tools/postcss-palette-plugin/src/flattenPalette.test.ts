import { cssify, flattenPalette } from './flattenPalette';

describe('flatten palette', () => {
    it('flattens a pallette', () => {
        const palette: any = {
            set: {
                extraLight: 'purple',
                light: 'pink',
                main: 'green',
                dark: 'blue',
                contrast: 'orange',
            },

            range: {
                50: 'red',
                100: 'yellow',
                200: 'pink',
                300: 'green',
                400: 'purple',
                500: 'orange',
                600: 'blue',
            },

            color: '#333',
            var: 'var(--color-set)',
        };

        const expected = new Map([
            ['--color-set-extra-light', 'purple'],
            ['--color-set-light', 'pink'],
            ['--color-set', 'green'],
            ['--color-set-dark', 'blue'],
            ['--color-set-contrast', 'orange'],

            ['--color-range-50', 'red'],
            ['--color-range-100', 'yellow'],
            ['--color-range-200', 'pink'],
            ['--color-range-300', 'green'],
            ['--color-range-400', 'purple'],
            ['--color-range-500', 'orange'],
            ['--color-range-600', 'blue'],

            ['--color-color', '#333'],
            ['--color-var', 'var(--color-set)'],
        ]);

        expect(flattenPalette(palette, 'color')).toEqual(expected);
    });

    describe('cssify', () => {
        const defaultPrefix = cssify('color');

        it('converts a single name', () => {
            expect(defaultPrefix('primary')).toBe('--color-primary');
            expect(defaultPrefix('white')).toBe('--color-white');
        });

        it('converts a name and a group', () => {
            expect(defaultPrefix('contrast', 'primary')).toBe(
                '--color-primary-contrast',
            );
            expect(defaultPrefix('100', 'grey')).toBe('--color-grey-100');
        });

        it('converts a camel to a kebab', () => {
            expect(defaultPrefix('extraLight', 'primary')).toBe(
                '--color-primary-extra-light',
            );
            expect(defaultPrefix('100', 'orangeRed')).toBe(
                '--color-orange-red-100',
            );
        });

        it('uses the group name for "main"', () => {
            expect(defaultPrefix('main', 'primary')).toBe('--color-primary');
        });

        it('should be usable without a prefix', () => {
            const noPrefix = cssify(null);

            expect(noPrefix('main', 'primary')).toBe('--primary');
            expect(noPrefix('100', 'orangeRed')).toBe('--orange-red-100');
        });
    });
});
