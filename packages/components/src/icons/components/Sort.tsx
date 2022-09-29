/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Sort = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path d="m12 21-4.5-6.5h9L12 21ZM12 3 7.5 9.5h9L12 3Z" />
    </svg>
);
