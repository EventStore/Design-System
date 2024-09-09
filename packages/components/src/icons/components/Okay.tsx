/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Okay = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path
            fill="none"
            stroke="currentColor"
            d="M12 22c2.7 0 5.2-1.1 7.1-2.9C21 17.2 22 14.7 22 12c0-2.7-1.1-5.2-2.9-7.1C17.2 3.1 14.7 2 12 2 9.3 2 6.8 3.1 4.9 4.9 3.1 6.8 2 9.3 2 12c0 2.7 1.1 5.2 2.9 7.1C6.8 20.9 9.3 22 12 22z"
        />
        <path fill="none" stroke="currentColor" d="m8 12 3 3 6-6" />
    </svg>
);
