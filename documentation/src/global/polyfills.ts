/* eslint-disable @typescript-eslint/no-empty-function */

import { Build } from '@stencil/core';

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

    global.UIEvent = class {} as any;
}
