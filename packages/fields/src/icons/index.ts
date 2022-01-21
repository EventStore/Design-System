import { iconStore } from '@eventstore/components';

iconStore.addIcons({
    get 'es-fields-error'() {
        return import('./components/EsFieldsError').then(
            ({ EsFieldsError }) => EsFieldsError,
        );
    },
    get 'es-fields-info'() {
        return import('./components/EsFieldsInfo').then(
            ({ EsFieldsInfo }) => EsFieldsInfo,
        );
    },
    get 'es-fields-warning'() {
        return import('./components/EsFieldsWarning').then(
            ({ EsFieldsWarning }) => EsFieldsWarning,
        );
    },
});
