import { createStore } from '@kurrent-ui/stores';

export interface Data {
    id: string;
    name: string;
}

export const { state: recordStore } = createStore<Record<string, Data>>({});
