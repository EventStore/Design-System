import { recordStore } from './recordStore';

const makeId = () => Math.random().toString(36).replace('0.', 'item_');

export const addItem = (name: string) => {
    const id = makeId();
    recordStore[id] = { id, name };
    return id;
};

export const renameItem = (id: string, name: string) => {
    recordStore[id] = { id, name };
};

export const removeItem = (id: string) => {
    delete recordStore[id];
};
