import './polyfills';
import '@eventstore/components';
import '@eventstore/layout';
import '@eventstore/editor';
import '@eventstore/fields';
import '@eventstore/theme';
import '../icons';

import { initialize } from '@eventstore/editor/initialize';

initialize({
    getWorkerUrl(_moduleId: string, label: string) {
        if (label === 'json') {
            return '/workers/json.worker.js';
        }
        if (label === 'typescript' || label === 'javascript') {
            return '/workers/ts.worker.js';
        }
        if (label === 'css') {
            return '/workers/css.worker.js';
        }
        if (label === 'html') {
            return '/workers/html.worker.js';
        }
        return '/workers/editor.worker.js';
    },
});
