import { Environment } from 'monaco-editor';

declare global {
    interface Window {
        MonacoEnvironment: Environment;
    }
}

export const initialize = (
    environment: Environment = {
        getWorkerUrl(_moduleId: any, label: string) {
            if (label === 'json') {
                return '/workers/json.worker.js';
            }

            return '/workers/editor.worker.js';
        },
    },
) => {
    self.MonacoEnvironment = environment;
};
