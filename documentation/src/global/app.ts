import './polyfills';
import '@eventstore-ui/components';
import '@eventstore-ui/layout';
import '@eventstore-ui/editor';
import '@eventstore-ui/fields';
import '@eventstore-ui/theme';
import '@eventstore-ui/illustrations';
import '../icons';

import { initialize } from '@eventstore-ui/editor/initialize';

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
