/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Spinner = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z" />
    </svg>
);
