import { iconStore } from '@eventstore/components';

iconStore.addIcons({
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
