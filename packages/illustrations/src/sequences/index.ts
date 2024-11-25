export const sequences = {
    get 1() {
        return import('./1').then((e) => e.sequence);
    },
    get 2() {
        return import('./2').then((e) => e.sequence);
    },
    get 3() {
        return import('./3').then((e) => e.sequence);
    },
    get 4() {
        return import('./4').then((e) => e.sequence);
    },
    get 5() {
        return import('./5').then((e) => e.sequence);
    },
};

export const MIN = 1;
export const MAX = 5;
