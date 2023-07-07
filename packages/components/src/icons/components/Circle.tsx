/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Circle = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx={12} cy={12} r={12} />
    </svg>
);
