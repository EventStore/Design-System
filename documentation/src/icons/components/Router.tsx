/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Router = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11 10H5L3 8l2-2h6V3l1-1 1 1v1h6l2 2-2 2h-6v2h6l2 2-2 2h-6v6a2 2 0 0 1 2 2H9a2 2 0 0 1 2-2V10Z" />
    </svg>
);
