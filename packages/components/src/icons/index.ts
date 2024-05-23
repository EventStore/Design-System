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
    get critical() {
        return import('./components/Critical').then(({ Critical }) => Critical);
    },
    get degraded() {
        return import('./components/Degraded').then(({ Degraded }) => Degraded);
    },
    get dot() {
        return import('./components/Dot').then(({ Dot }) => Dot);
    },
    get error() {
        return import('./components/Error').then(({ Error }) => Error);
    },
    get info() {
        return import('./components/Info').then(({ Info }) => Info);
    },
    get lightbulb() {
        return import('./components/Lightbulb').then(
            ({ Lightbulb }) => Lightbulb,
        );
    },
    get more() {
        return import('./components/More').then(({ More }) => More);
    },
    get okay() {
        return import('./components/Okay').then(({ Okay }) => Okay);
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
    get warning() {
        return import('./components/Warning').then(({ Warning }) => Warning);
    },
});
