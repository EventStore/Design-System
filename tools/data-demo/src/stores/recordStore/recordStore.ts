import { createStore } from '@eventstore/data';

export interface Data {
    id: string;
    name: string;
}

export const { state: recordStore } = createStore<Record<string, Data>>({});
