/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Signs = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11 12H3.5L6 9.5 3.5 7H11V3l1-1 1 1v4h5l2.5 2.5L18 12h-5v8a2 2 0 0 1 2 2H9a2 2 0 0 1 2-2v-8Z" />
    </svg>
);
