/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const ExclamationMark = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.7 2.1h4.6l-.5 13.7H10L9.7 2.1zm.3 15.6h4v4.2h-4v-4.2z" />
    </svg>
);
