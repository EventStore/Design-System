import { iconStore } from '@eventstore/components';
import { ES_LAYOUT } from './namespace';

iconStore.addIcons(ES_LAYOUT, {
    get caret() {
        return import('./components/Caret').then(({ Caret }) => Caret);
    },
    get chevron() {
        return import('./components/Chevron').then(({ Chevron }) => Chevron);
    },
    get 'dark-high-theme'() {
        return import('./components/DarkHighTheme').then(
            ({ DarkHighTheme }) => DarkHighTheme,
        );
    },
    get 'dark-low-theme'() {
        return import('./components/DarkLowTheme').then(
            ({ DarkLowTheme }) => DarkLowTheme,
        );
    },
    get 'grip-lines'() {
        return import('./components/GripLines').then(
            ({ GripLines }) => GripLines,
        );
    },
    get 'light-high-theme'() {
        return import('./components/LightHighTheme').then(
            ({ LightHighTheme }) => LightHighTheme,
        );
    },
    get 'light-low-theme'() {
        return import('./components/LightLowTheme').then(
            ({ LightLowTheme }) => LightLowTheme,
        );
    },
});
