/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Markdown = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path
            fill="none"
            stroke="currentColor"
            d="M3.2 6.4h17.6c.5 0 1 .4 1 1v9.7c0 .5-.4 1-1 1H3.2c-.5 0-1-.4-1-1V7.4c0-.6.5-1 1-1z"
        />
        <path d="M4.7 15.6V8.8h2l2 2.5 2-2.5h2v6.7h-2v-3.9l-2 2.5-2-2.5v3.9h-2zm12.3 0-3-3.3h2V8.8h2v3.5h2l-3 3.3z" />
    </svg>
);
