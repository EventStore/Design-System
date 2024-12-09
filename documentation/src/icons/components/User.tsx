/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const User = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM21 22a9 9 0 1 0-18 0" />
    </svg>
);
