/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Fields = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
    >
        <path d="M21 4H3c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h18c.6 0 1-.4 1-1V5c0-.6-.4-1-1-1zM2 14.5h20M2 9.5h20M8.5 20V9.5M2 19V8.5M22 19V8.5M15.5 20V9.5M4.5 20h15" />
    </svg>
);
