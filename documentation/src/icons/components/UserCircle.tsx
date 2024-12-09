/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const UserCircle = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
    >
        <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z" />
        <path d="M12 11.8c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zM18.6 19.5C18 16.4 15.3 14 12 14s-6 2.3-6.6 5.4" />
    </svg>
);
