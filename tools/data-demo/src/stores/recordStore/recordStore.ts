import { createStore } from '@eventstore/data';

export interface Data {
    id: string;
    name: string;
}

export const { data: recordStore } = createStore<Record<string, Data>>({});
