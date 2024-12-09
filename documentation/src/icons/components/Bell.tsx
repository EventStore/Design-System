/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Bell = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M2 19h20M5 19V9a7 7 0 1 1 14 0v10H5ZM12 22a2.5 2.5 0 0 0 2.5-2.5V19h-5v.5A2.5 2.5 0 0 0 12 22Z" />
    </svg>
);
