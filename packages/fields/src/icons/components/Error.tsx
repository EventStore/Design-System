/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Error = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 14h-2V9h2m0 9h-2v-2h2M1 21h22L12 2 1 21Z" />
    </svg>
);
