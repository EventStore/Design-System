import '../utils/initialize';
import { createListStore } from './createListStore';

test('listStore default change detector for delete', () => {
    const store = createListStore({ id: 'hello', id2: 'world' });
    const DEL = jest.fn();
    store.onChange(DEL);
    store.delete('id');
    expect(DEL).toBeCalledWith({ id2: 'world' });
});

test('listStore default change detector for specific id for delete', () => {
    const store = createListStore({ id: 'hello', id2: 'world' });
    const DEL = jest.fn();
    store.onChange('id', DEL);
    store.delete('id2');
    expect(DEL).toBeCalledTimes(0);
    store.delete('id');
    expect(DEL).toBeCalledTimes(1);
    expect(DEL).toBeCalledWith(undefined);
});
