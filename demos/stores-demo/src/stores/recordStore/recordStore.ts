import { createStore } from '@eventstore/stores';

export interface Data {
    id: string;
    name: string;
}

export const { state: recordStore } = createStore<Record<string, Data>>({});
