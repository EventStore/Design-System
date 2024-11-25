import { iconStore } from '../utils/iconStore';
import { ICON_NAMESPACE } from './namespace';

iconStore.addIcons(ICON_NAMESPACE, {
    get check() {
        return import('./components/Check').then(({ Check }) => Check);
    },
    get chevron() {
        return import('./components/Chevron').then(({ Chevron }) => Chevron);
    },
    get 'chevron-double'() {
        return import('./components/ChevronDouble').then(
            ({ ChevronDouble }) => ChevronDouble,
        );
    },
    get circle() {
        return import('./components/Circle').then(({ Circle }) => Circle);
    },
    get close() {
        return import('./components/Close').then(({ Close }) => Close);
    },
    get copy() {
        return import('./components/Copy').then(({ Copy }) => Copy);
    },
    get dot() {
        return import('./components/Dot').then(({ Dot }) => Dot);
    },
    get 'exclamation-mark'() {
        return import('./components/ExclamationMark').then(
            ({ ExclamationMark }) => ExclamationMark,
        );
    },
    get error() {
        return this['exclamation-mark'];
    },
    get warning() {
        return this['exclamation-mark'];
    },
    get info() {
        return import('./components/Info').then(({ Info }) => Info);
    },
    get more() {
        return import('./components/More').then(({ More }) => More);
    },
    get sort() {
        return import('./components/Sort').then(({ Sort }) => Sort);
    },
    get sorted() {
        return import('./components/Sorted').then(({ Sorted }) => Sorted);
    },
    get spinner() {
        return import('./components/Spinner').then(({ Spinner }) => Spinner);
    },
    get trash() {
        return import('./components/Trash').then(({ Trash }) => Trash);
    },
});
