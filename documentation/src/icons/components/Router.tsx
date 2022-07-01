/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Router = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M19.65 3H4.35A1.35 1.35 0 0 0 3 4.35v15.3c0 .746.604 1.35 1.35 1.35h15.3A1.35 1.35 0 0 0 21 19.65V4.35A1.35 1.35 0 0 0 19.65 3ZM18 13.5 14.5 15M10.5 16.5 7 18" />
        <path d="M8 14.5c1-1.448 1.5-2.448 1.5-3a1.5 1.5 0 1 0-3 0c0 .552.5 1.552 1.5 3ZM16 11c1-1.448 1.5-2.448 1.5-3a1.5 1.5 0 1 0-3 0c0 .552.5 1.552 1.5 3Z" />
    </svg>
);
