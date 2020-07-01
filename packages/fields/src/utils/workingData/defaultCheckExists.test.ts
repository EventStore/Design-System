import { defaultCheckExists } from './defaultCheckExists';

describe('defaultCheckExists', () => {
    test('should return return false on undefined / null', () => {
        {
            const exists = defaultCheckExists(undefined);
            expect(exists).toBe(false);
        }
        {
            const exists = defaultCheckExists(null);
            expect(exists).toBe(false);
        }
    });

    test('should provide a sensible default for strings', () => {
        {
            const exists = defaultCheckExists('');
            expect(exists).toBe(false);
        }
        {
            const exists = defaultCheckExists(' ');
            expect(exists).toBe(false);
        }
        {
            const exists = defaultCheckExists('hi');
            expect(exists).toBe(true);
        }
        {
            const exists = defaultCheckExists('0');
            expect(exists).toBe(true);
        }
        {
            const exists = defaultCheckExists('false');
            expect(exists).toBe(true);
        }
    });

    test('should provide a sensible default for numbers', () => {
        {
            const exists = defaultCheckExists(1);
            expect(exists).toBe(true);
        }
        {
            const exists = defaultCheckExists(0);
            expect(exists).toBe(true);
        }
        {
            const exists = defaultCheckExists(-1);
            expect(exists).toBe(true);
        }
        {
            const exists = defaultCheckExists(NaN);
            expect(exists).toBe(false);
        }
    });

    test('should provide a sensible default for booleans', () => {
        {
            const exists = defaultCheckExists(true);
            expect(exists).toBe(true);
        }
        {
            const exists = defaultCheckExists(false);
            expect(exists).toBe(false);
        }
    });

    test('should provide a sensible default for arrays', () => {
        {
            const exists = defaultCheckExists([]);
            expect(exists).toBe(false);
        }
        {
            const exists = defaultCheckExists(['a']);
            expect(exists).toBe(true);
        }
        {
            const exists = defaultCheckExists(['a', false, true]);
            expect(exists).toBe(true);
        }
    });
});
