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
    get okay() {
        return import('./components/Okay').then(({ Okay }) => Okay);
    },
    get spinner() {
        return import('./components/Spinner').then(({ Spinner }) => Spinner);
    },
    get warning() {
        return import('./components/Warning').then(({ Warning }) => Warning);
    },
});