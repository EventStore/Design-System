/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Users = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
    >
        <path d="M8.5 10c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.4 3 3 3zM15.3 19a6.7 6.7 0 0 0-13.4 0M17.2 10.4c1.4 0 2.5-1.1 2.5-2.5s-1.1-2.5-2.5-2.5-2.4 1.2-2.4 2.6 1.1 2.4 2.4 2.4z" />
        <path d="M22.8 17.8c0-3-2.5-5.5-5.5-5.5-1.6 0-3.1.7-4.1 1.8" />
    </svg>
);
