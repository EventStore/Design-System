/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Head = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 3C9.2 3 6.2 5.9 6 9.7l-1.9 2.5c-.2.3 0 .8.4.8H6v3c0 1.1.9 2 2 2h1v3h7v-4.7c2.4-1.1 4-3.5 4-6.3 0-3.9-3.1-7-7-7" />
    </svg>
);
