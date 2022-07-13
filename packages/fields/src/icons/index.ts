import { iconStore } from '@eventstore-ui/components';
import { ICON_NAMESPACE } from './namespace';

iconStore.addIcons(ICON_NAMESPACE, {
    get check() {
        return import('./components/Check').then(({ Check }) => Check);
    },
    get chevron() {
        return import('./components/Chevron').then(({ Chevron }) => Chevron);
    },
    get error() {
        return import('./components/Error').then(({ Error }) => Error);
    },
    get info() {
        return import('./components/Info').then(({ Info }) => Info);
    },
    get plus() {
        return import('./components/Plus').then(({ Plus }) => Plus);
    },
    get trash() {
        return import('./components/Trash').then(({ Trash }) => Trash);
    },
    get warning() {
        return import('./components/Warning').then(({ Warning }) => Warning);
    },
});
