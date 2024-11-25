/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const CreditCard = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 7H4V8h16Z" />
    </svg>
);
