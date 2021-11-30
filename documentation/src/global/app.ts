/* eslint-disable @typescript-eslint/no-empty-function */
import { Build } from '@stencil/core';
import '@eventstore/components';
import '@eventstore/layout';
import '@eventstore/editor';
import '@eventstore/fields';
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

if (Build.isServer) {
    document.queryCommandSupported = () => false;
    global.MutationObserver = class {
        disconnect() {}
        observe() {}
        takeRecords() {
            return [];
        }
    };
    global.ResizeObserver = class {
        disconnect() {}
        observe() {}
        unobserve() {}
    };
}
