/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Folder = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M2 4.5v16l2.5-10h15.25v-3a1 1 0 0 0-1-1H12l-2.5-3H3a1 1 0 0 0-1 1Z" />
        <path d="m20 20.5 2-10H4.406L2 20.5h18Z" />
    </svg>
);
