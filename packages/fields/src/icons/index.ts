import { iconStore } from '@kurrent-ui/components';
import { ICON_NAMESPACE } from './namespace';

iconStore.addIcons(ICON_NAMESPACE, {
    get check() {
        return import('./components/Check').then(({ Check }) => Check);
    },
    get chevron() {
        return import('./components/Chevron').then(({ Chevron }) => Chevron);
    },
    get edit() {
        return import('./components/Edit').then(({ Edit }) => Edit);
    },
    get error() {
        return import('./components/Error').then(({ Error }) => Error);
    },
    get 'external-link'() {
        return import('./components/ExternalLink').then(
            ({ ExternalLink }) => ExternalLink,
        );
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
