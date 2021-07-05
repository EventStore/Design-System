import { createObservableMap } from './observableMap';

describe.each<[label: string, method: 'reset' | 'dispose']>([
    ['reset', 'reset'],
    ['dispose calls reset', 'dispose'],
])('%s', (_, methodName) => {
    test('returns all variable to their original state', () => {
        const { [methodName]: method, state } = createObservableMap({
            hola: 'hola',
            name: 'Sergio',
        });

        state.hola = 'hello';
        state.name = 'Manu';

        expect(state.hola).toBe('hello');
        expect(state.name).toBe('Manu');

        method();

        expect(state.hola).toBe('hola');
        expect(state.name).toBe('Sergio');
    });

    test('extra properties get removed', () => {
        const { [methodName]: method, state } = createObservableMap<
            Record<string, string>
        >({});

        state.hola = 'hello';

        expect(state).toHaveProperty('hola');
        expect(state.hola).toBe('hello');

        method();

        expect(state).not.toHaveProperty('hola');
    });

    test('calls on', () => {
        const { [methodName]: method, on } = createObservableMap({
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
        const { dispose, on } = createObservableMap({ hola: 'hello' });
        const subscription = jest.fn();

        on('dispose', subscription);

        dispose();

        expect(subscription).toHaveBeenCalledTimes(1);
    });
});

describe('get', () => {
    test('returns the value for the property in the store', () => {
        const { state } = createObservableMap({
            hola: 'hello',
        });

        expect(state.hola).toBe('hello');
    });

    test('returns the modified value after being set', () => {
        const { state } = createObservableMap({
            hola: 'hello',
        });

        state.hola = 'ola';

        expect(state.hola).toBe('ola');
    });

    test('calls on', () => {
        const { on, state } = createObservableMap({
            hola: 'hello',
        });
        const subscription = jest.fn();
        on('get', subscription);

        state.hola;

        expect(subscription).toHaveBeenCalledWith('hola');
    });
});

describe('set', () => {
    test('sets the value for a property', () => {
        const { state } = createObservableMap({
            hola: 'hello',
        });

        state.hola = 'ola';

        expect(state.hola).toBe('ola');
    });

    test('calls on', () => {
        const { on, state } = createObservableMap({
            hola: 'hello',
        });
        const subscription = jest.fn();
        on('set', subscription);

        state.hola = 'ola';

        expect(subscription).toHaveBeenCalledWith('hola', 'ola', 'hello');
    });

    test('calls onChange', () => {
        const { onChange, state } = createObservableMap({
            hola: 'hello',
        });
        const subscription = jest.fn();
        onChange('hola', subscription);

        state.hola = 'ola';

        expect(subscription).toHaveBeenCalledWith('ola');
    });

    test('enumerable keys', () => {
        const { state } = createObservableMap<any>({});
        expect(Object.keys(state)).toEqual([]);
        state.hello = 'hola';
        expect(Object.keys(state)).toEqual(['hello']);
        expect(Object.getOwnPropertyNames(state)).toEqual(['hello']);
        const copy = { ...state };
        expect(copy).toEqual({ hello: 'hola' });
    });

    test('in operator', () => {
        const { state } = createObservableMap<any>({});
        expect('hello' in state).toBe(false);
        state.hello = 'hola';
        expect('hello' in state).toBe(true);
    });
});

test('unregister events', () => {
    const { reset, state, on, onChange } = createObservableMap({
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

    state.hola = 'hola2';
    state.name = 'hola2';
    expect(SET).toHaveBeenCalledTimes(2);
    unset();
    state.hola = 'hola3';
    expect(SET).toHaveBeenCalledTimes(2);

    state.hola;
    state.name;
    expect(GET).toHaveBeenCalledTimes(2);
    unget();
    state.name;
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
    state.hola = 'hola';
    expect(CHANGE).toHaveBeenCalledTimes(5);
});

test('default change detector', () => {
    const store = createObservableMap({
        str: 'hola',
    });
    const SET = jest.fn();
    store.on('set', SET);
    store.state.str = 'hola';
    expect(SET).not.toBeCalled();
    store.state.str = 'hola2';
    expect(SET).toBeCalledWith('str', 'hola2', 'hola');
});

test('custom change detector, values', () => {
    const comparer = jest.fn((a, b) => a !== b);
    const store = createObservableMap(
        {
            str: 'hola',
        },
        comparer,
    );
    store.state.str = 'hola';
    expect(comparer).toBeCalledWith('hola', 'hola', 'str');
    store.state.str = 'hola2';
    expect(comparer).toBeCalledWith('hola2', 'hola', 'str');
    store.state.str = 'hola3';
    expect(comparer).toBeCalledWith('hola3', 'hola2', 'str');
});

test('custom change detector, prevent all mutations', () => {
    const store = createObservableMap(
        {
            str: 'hola',
        },
        () => false,
    );
    const SET = jest.fn();
    store.on('set', SET);
    store.state.str = 'hola';
    expect(SET).not.toBeCalled();
    store.state.str = 'hola2';
    expect(SET).not.toBeCalled();
    expect(store.state.str).toEqual('hola');
});
