import { createStore } from '@eventstore/data';

export interface StandardStore {
    foo: string;
    bar: boolean;
}

export const { data: standardStore } = createStore<StandardStore>({
    foo: 'hello',
    bar: false,
});
