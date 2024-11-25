/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Shield = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4Z" />
    </svg>
);
