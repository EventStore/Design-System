import '../utils/initialize';
import { createListStore } from './createListStore';

test('listStore default change detector for delete', () => {
    const store = createListStore({ id: { a: 'a', b: 'b' } });
    const DEL = jest.fn();
    store.onChange(DEL);
    store.delete('id');
    expect(DEL).toBeCalledWith(undefined);
});

test('listStore default change detector for specific id for delete', () => {
    const store = createListStore({ id: { a: 'a' }, id1: { b: 'b' } });
    const DEL = jest.fn();
    store.onChange('id', DEL);
    store.delete('id1');
    expect(DEL).toBeCalledTimes(0);
    store.delete('id');
    expect(DEL).toBeCalledTimes(1);
});
