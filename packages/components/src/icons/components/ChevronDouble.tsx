/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const ChevronDouble = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M16.59 5.59 18 7l-6 6-6-6 1.41-1.41L12 10.17l4.59-4.58m0 6L18 13l-6 6-6-6 1.41-1.41L12 16.17l4.59-4.58Z" />
    </svg>
);
