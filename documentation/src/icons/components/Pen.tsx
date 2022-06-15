/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Pen = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M2.662 21.75h4.243L22.461 6.194 18.22 1.95 2.662 17.507v4.243ZM13.976 6.193l4.243 4.243" />
    </svg>
);
