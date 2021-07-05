import { createStore } from '@eventstore/data';

export interface StandardStore {
    foo: string;
    bar: boolean;
}

export const { state: standardStore } = createStore<StandardStore>({
    foo: 'hello',
    bar: false,
});
