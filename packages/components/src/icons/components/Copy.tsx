/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Copy = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M6.5 6.216v-2.31c0-.776.63-1.406 1.406-1.406h12.188c.776 0 1.406.63 1.406 1.406v12.188c0 .776-.63 1.406-1.406 1.406h-2.336" />
        <path d="M16.094 6.5H3.906C3.13 6.5 2.5 7.13 2.5 7.906v12.188c0 .776.63 1.406 1.406 1.406h12.188c.776 0 1.406-.63 1.406-1.406V7.906c0-.776-.63-1.406-1.406-1.406Z" />
    </svg>
);
