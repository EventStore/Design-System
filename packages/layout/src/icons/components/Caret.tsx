/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Caret = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5.9 9H18c.8 0 1.3 1 .7 1.6l-6.1 6.1c-.4.4-.9.4-1.3 0l-6.1-6.1C4.7 10 5.1 9 5.9 9z" />
    </svg>
);
