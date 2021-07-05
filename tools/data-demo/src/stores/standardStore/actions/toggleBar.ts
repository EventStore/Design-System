import { standardStore } from '../standardStore';

export const toggleBar = () => {
    standardStore.bar = !standardStore.bar;
};
