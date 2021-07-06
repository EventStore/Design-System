import { createStore } from './createStore';

describe.each<[label: string, method: 'reset' | 'dispose']>([
    ['reset', 'reset'],
    ['dispose calls reset', 'dispose'],
])('%s', (_, methodName) => {
    test('returns all variable to their original data', () => {
        const { [methodName]: method, data } = createStore({
            hola: 'hola',
            name: 'Sergio',
        });

        data.hola = 'hello';
        data.name = 'Manu';

        expect(data.hola).toBe('hello');
        expect(data.name).toBe('Manu');

        method();

        expect(data.hola).toBe('hola');
        expect(data.name).toBe('Sergio');
    });

    test('extra properties get removed', () => {
        const { [methodName]: method, data } = createStore<
            Record<string, string>
        >({});

        data.hola = 'hello';

        expect(data).toHaveProperty('hola');
        expect(data.hola).toBe('hello');

        method();

        expect(data).not.toHaveProperty('hola');
    });

    test('calls on', () => {
        const { [methodName]: method, on } = createStore({
            hola: 'hello',
        });
        const subscription = jest.fn();

        on('reset', subscription);

        method();

        expect(subscription).toHaveBeenCalledTimes(1);
    });
});

describe('dispose', () => {
    test('calls on', () => {
        const { dispose, on } = createStore({ hola: 'hello' });
        const subscription = jest.fn();

        on('dispose', subscription);

        dispose();

        expect(subscription).toHaveBeenCalledTimes(1);
    });
});

describe('get', () => {
    test('returns the value for the property in the store', () => {
        const { data } = createStore({
            hola: 'hello',
        });

        expect(data.hola).toBe('hello');
    });

    test('returns the modified value after being set', () => {
        const { data } = createStore({
            hola: 'hello',
        });

        data.hola = 'ola';

        expect(data.hola).toBe('ola');
    });

    test('calls on', () => {
        const { on, data } = createStore({
            hola: 'hello',
        });
        const subscription = jest.fn();
        on('get', subscription);

        data.hola;

        expect(subscription).toHaveBeenCalledWith('hola');
    });
});

describe('set', () => {
    test('sets the value for a property', () => {
        const { data } = createStore({
            hola: 'hello',
        });

        data.hola = 'ola';

        expect(data.hola).toBe('ola');
    });

    test('calls on', () => {
        const { on, data } = createStore({
            hola: 'hello',
        });
        const subscription = jest.fn();
        on('set', subscription);

        data.hola = 'ola';

        expect(subscription).toHaveBeenCalledWith('hola', 'ola', 'hello');
    });

    test('calls onChange', () => {
        const { onChange, data } = createStore({
            hola: 'hello',
        });
        const subscription = jest.fn();
        onChange('hola', subscription);

        data.hola = 'ola';

        expect(subscription).toHaveBeenCalledWith('ola');
    });

    test('enumerable keys', () => {
        const { data } = createStore<any>({});
        expect(Object.keys(data)).toEqual([]);
        data.hello = 'hola';
        expect(Object.keys(data)).toEqual(['hello']);
        expect(Object.getOwnPropertyNames(data)).toEqual(['hello']);
        const copy = { ...data };
        expect(copy).toEqual({ hello: 'hola' });
    });

    test('in operator', () => {
        const { data } = createStore<any>({});
        expect('hello' in data).toBe(false);
        data.hello = 'hola';
        expect('hello' in data).toBe(true);
    });
});

test('unregister events', () => {
    const { reset, data, on, onChange } = createStore({
        hola: 'hola',
        name: 'Sergio',
    });
    const SET = jest.fn();
    const GET = jest.fn();
    const RESET = jest.fn();
    const CHANGE = jest.fn();

    const unset = on('set', SET);
    const unget = on('get', GET);
    const unreset = on('reset', RESET);
    const unChange = onChange('hola', CHANGE);

    data.hola = 'hola2';
    data.name = 'hola2';
    expect(SET).toHaveBeenCalledTimes(2);
    unset();
    data.hola = 'hola3';
    expect(SET).toHaveBeenCalledTimes(2);

    data.hola;
    data.name;
    expect(GET).toHaveBeenCalledTimes(2);
    unget();
    data.name;
    expect(GET).toHaveBeenCalledTimes(2);

    reset();
    reset();
    expect(RESET).toHaveBeenCalledTimes(2);
    unreset();
    reset();
    expect(RESET).toHaveBeenCalledTimes(2);

    expect(CHANGE).toHaveBeenCalledTimes(5);
    unChange();
    reset();
    data.hola = 'hola';
    expect(CHANGE).toHaveBeenCalledTimes(5);
});

test('default change detector', () => {
    const store = createStore({
        str: 'hola',
    });
    const SET = jest.fn();
    store.on('set', SET);
    store.data.str = 'hola';
    expect(SET).not.toBeCalled();
    store.data.str = 'hola2';
    expect(SET).toBeCalledWith('str', 'hola2', 'hola');
});

test('custom change detector, values', () => {
    const comparer = jest.fn((a, b) => a !== b);
    const store = createStore(
        {
            str: 'hola',
        },
        comparer,
    );
    store.data.str = 'hola';
    expect(comparer).toBeCalledWith('hola', 'hola', 'str');
    store.data.str = 'hola2';
    expect(comparer).toBeCalledWith('hola2', 'hola', 'str');
    store.data.str = 'hola3';
    expect(comparer).toBeCalledWith('hola3', 'hola2', 'str');
});

test('custom change detector, prevent all mutations', () => {
    const store = createStore(
        {
            str: 'hola',
        },
        () => false,
    );
    const SET = jest.fn();
    store.on('set', SET);
    store.data.str = 'hola';
    expect(SET).not.toBeCalled();
    store.data.str = 'hola2';
    expect(SET).not.toBeCalled();
    expect(store.data.str).toEqual('hola');
});
