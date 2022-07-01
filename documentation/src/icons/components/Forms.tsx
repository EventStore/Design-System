/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Forms = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
    >
        <path d="M10.5 15.3c0-1.6.6-3.2 1.8-4.4 1.2-1.1 2.7-1.8 4.4-1.8 1.6 0 3.2.6 4.4 1.8l.9 1.2V5c0-.6-.4-1-1-1H3c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h9.7c-.1-.1-.2-.2-.4-.3-1.1-1.2-1.8-2.7-1.8-4.4zM2 14.5h8.4M2 9.5h12.4M19.2 9.5H22M8.5 20V9.5M2 19V8.5M22 11V8.5M4.5 20h7.6" />
        <path d="M16.7 21.5c1.7 0 3.2-.7 4.4-1.8 1.2-1.2 1.8-2.8 1.8-4.4 0-1.7-.7-3.2-1.8-4.4-1.2-1.2-2.8-1.8-4.4-1.8-1.7 0-3.2.7-4.4 1.8-1.2 1.2-1.8 2.8-1.8 4.4 0 1.7.7 3.2 1.8 4.4 1.2 1.1 2.8 1.8 4.4 1.8z" />
        <path d="m13.9 15.3 1.9 1.9 3.7-3.7" />
    </svg>
);
