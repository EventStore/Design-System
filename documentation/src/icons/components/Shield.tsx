/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Shield = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M3 4.128 12.004 1.5 21 4.128v5.389A13.158 13.158 0 0 1 12.001 22 13.16 13.16 0 0 1 3 9.514V4.128Z" />
    </svg>
);
