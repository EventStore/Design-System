import { standardStore } from '../standardStore';

export const setFoo = (value: string) => {
    standardStore.foo = value;
};
