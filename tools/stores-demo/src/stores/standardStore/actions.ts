import { standardStore } from './standardStore';

export const setFoo = (value: string) => {
    standardStore.foo = value;
};

export const toggleBar = () => {
    standardStore.bar = !standardStore.bar;
};
