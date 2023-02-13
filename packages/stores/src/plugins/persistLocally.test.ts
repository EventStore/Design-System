import '../utils/initialize';
import { persistLocally } from './persistLocally';
import { createStore } from '../stores/createStore';

jest.useRealTimers();

interface FakeStorageEventInit {
    key: string;
    storageArea: Storage;
}

interface TestData {
    foo: string;
    bar: boolean;
}

interface TestDataAlt {
    str?: string;
    bool?: boolean;
    bigInt?: bigint;
    num?: number;
}

class FakeStorageEvent extends CustomEvent<FakeStorageEventInit> {
    readonly key: string | null;
    readonly storageArea: Storage | null;

    constructor(detail: FakeStorageEventInit) {
        super('storage', { detail });

        this.key = detail!.key;
        this.storageArea = detail!.storageArea;
    }
}

const localStorageOperations = {
    setItem(key: string, value: string) {
        localStorage.setItem(key, value);

        globalThis.dispatchEvent(
            new FakeStorageEvent({
                key: key,
                storageArea: localStorage,
            }),
        );
    },
};

const bigIntJSONParser = {
    serialise: <T>(data: Partial<T>): string => {
        return JSON.stringify(data, (_, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value,
        );
    },
    deserialize: <T>(str: string): Partial<T> => {
        return JSON.parse(str, (key, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.split('n')[0]);
            }
            return value;
        });
    },
};

describe('persistLocally', () => {
    test('should persist data to browser storage', async () => {
        jest.spyOn(Storage.prototype, 'setItem');

        const STORAGE_KEY = 'persist';
        const store = createStore<TestData>({
            foo: 'hello',
            bar: false,
        });

        store.use(
            persistLocally(STORAGE_KEY, {
                keys: ['foo', 'bar'],
                storage: localStorage,
            }),
        );

        store.set('foo', 'ciao');
        store.set('bar', true);

        await new Promise((r) => setTimeout(r, 0));

        expect(localStorage.setItem).toBeCalledTimes(1);

        store.set('foo', 'bella');
        store.set('bar', false);

        await new Promise((r) => setTimeout(r, 0));

        expect(localStorage.setItem).toBeCalledTimes(2);
    });

    test('should initialise store from browser storage', async () => {
        const STORAGE_KEY = 'initialise';
        const store = createStore<TestData>({
            foo: '',
            bar: false,
        });

        localStorageOperations.setItem(
            STORAGE_KEY,
            JSON.stringify({ foo: 'hello', bar: true }),
        );

        store.use(
            persistLocally(STORAGE_KEY, {
                keys: ['foo', 'bar'],
                storage: localStorage,
            }),
        );

        expect(store.state.foo).toBe('hello');
        expect(store.state.bar).toBe(true);
    });

    test('should replicate browser storage to store', async () => {
        const STORAGE_KEY = 'replicate';
        const store = createStore<TestData>({
            foo: 'hello',
            bar: false,
        });

        store.use(
            persistLocally(STORAGE_KEY, {
                keys: ['foo', 'bar'],
                storage: localStorage,
            }),
        );

        localStorageOperations.setItem(
            STORAGE_KEY,
            JSON.stringify({ foo: 'hola', bar: true }),
        );

        expect(store.state.foo).toBe('hola');
        expect(store.state.bar).toBe(true);
    });

    test('should back all keys by default', async () => {
        const STORAGE_KEY = 'back_all_keys';
        const store = createStore<TestData>({
            foo: 'hello',
            bar: true,
        });

        store.use(
            persistLocally(STORAGE_KEY, {
                storage: localStorage,
            }),
        );

        await new Promise((r) => setTimeout(r, 0));

        const obj = JSON.parse(localStorage.getItem(STORAGE_KEY)!);

        expect(obj.foo).toBe('hello');
        expect(obj.bar).toBe(true);
    });

    test('should only back specified keys', async () => {
        const STORAGE_KEY = 'back_specific_keys';
        const store = createStore<TestDataAlt>({
            str: 'hello',
            bool: true,
            num: 1337,
        });

        store.use(
            persistLocally(STORAGE_KEY, {
                storage: localStorage,
                keys: ['str', 'num'],
            }),
        );

        await new Promise((r) => setTimeout(r, 0));

        const obj: TestDataAlt = JSON.parse(localStorage.getItem(STORAGE_KEY)!);

        expect(obj.str).toBe('hello');
        expect(obj.num).toBe(1337);
        expect(obj.bool).toBeUndefined();
        expect(obj.bigInt).toBeUndefined();
    });

    test('should stay consistent across multiple tabs', async () => {
        const STORAGE_KEY = 'many_tabs';
        const store1 = createStore<TestData>({
            foo: 'hello from store1',
            bar: true,
        });

        store1.use(
            persistLocally(STORAGE_KEY, {
                storage: localStorage,
            }),
        );

        await new Promise((r) => setTimeout(r, 0));

        const store2 = createStore<TestData>({
            foo: 'hello from store2',
            bar: false,
        });

        store2.use(
            persistLocally(STORAGE_KEY, {
                storage: localStorage,
            }),
        );

        expect(store2.state.foo).toBe('hello from store1');

        store1.set('foo', 'bla');

        await new Promise((r) => setTimeout(r, 0));
        globalThis.dispatchEvent(
            new FakeStorageEvent({
                key: STORAGE_KEY,
                storageArea: localStorage,
            }),
        );

        expect(store2.state.foo).toBe('bla');
    });

    test('should support custom serialiser/deserialisers', async () => {
        const STORAGE_KEY = 'custom serialiser/deserialisers';
        const data: TestDataAlt = {
            bigInt: BigInt(9007199254740991),
        };

        const s = bigIntJSONParser.serialise(data);
        expect(s).toBe('{"bigInt":"9007199254740991n"}');

        const d: TestDataAlt = bigIntJSONParser.deserialize(s);
        expect(typeof d.bigInt).toBe('bigint');

        const store = createStore<TestDataAlt>(data);
        store.use(
            persistLocally(STORAGE_KEY, {
                storage: localStorage,
                serialize: bigIntJSONParser.serialise,
                deserialize: bigIntJSONParser.deserialize,
            }),
        );

        await new Promise((r) => setTimeout(r, 0));
        expect(localStorage.getItem(STORAGE_KEY)).toBe(
            '{"bigInt":"9007199254740991n"}',
        );

        const store2 = createStore<TestDataAlt>(data);
        store.use(
            persistLocally(STORAGE_KEY, {
                storage: localStorage,
                serialize: bigIntJSONParser.serialise,
                deserialize: bigIntJSONParser.deserialize,
            }),
        );

        expect(typeof store2.state.bigInt).toBe('bigint');
        expect(store2.state.bigInt).toBe(BigInt(9007199254740991));
    });
});
