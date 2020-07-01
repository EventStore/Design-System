import { Bread } from '../components/es-toaster/es-toaster';

const popToast = (level: Bread['level']) => (
    options: Omit<Bread, 'level'>,
    targetDocument: Document = document,
) => {
    let toaster = targetDocument.querySelector('es-toaster');

    if (!toaster) {
        toaster = targetDocument.createElement('es-toaster');
        targetDocument.body.appendChild(toaster);
    }

    toaster.popToast({ ...options, level });
};

export const toast = {
    success: popToast('success'),
    info: popToast('info'),
    warning: popToast('warning'),
    error: popToast('error'),
};
