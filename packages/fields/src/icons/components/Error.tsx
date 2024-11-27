/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Error = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path fill="none" stroke="currentColor" d="M12 2.5 1 21.4h22L12 2.5z" />
        <path d="M10.8 8.8h2.5l-.3 7.4h-2l-.2-7.4zm.1 8.5H13v2.3h-2.1v-2.3z" />
    </svg>
);
