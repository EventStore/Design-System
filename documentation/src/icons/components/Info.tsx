/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Info = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2Z" />
    </svg>
);
