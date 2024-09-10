/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Warning = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path
            fill="none"
            stroke="currentColor"
            d="M12 22c2.7 0 5.2-1 7.1-2.9S22 14.7 22 12s-1-5.2-2.9-7.1S14.7 2 12 2 6.8 3 4.9 4.9 2 9.3 2 12s1 5.2 2.9 7.1C6.8 21 9.3 22 12 22z"
        />
        <path d="M10.4 5.3h3.1l-.3 9.2h-2.6l-.2-9.2zm.2 10.6h2.7v2.8h-2.7v-2.8z" />
    </svg>
);
