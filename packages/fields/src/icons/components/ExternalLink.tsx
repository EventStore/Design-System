/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const ExternalLink = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} aria-hidden="true" viewBox="0 0 512 512">
        <path d="M440 256h-16a8 8 0 00-8 8v200a16 16 0 01-16 16H48a16 16 0 01-16-16V112a16 16 0 0116-16h200a8 8 0 008-8V72a8 8 0 00-8-8H48a48 48 0 00-48 48v352a48 48 0 0048 48h352a48 48 0 0048-48V264a8 8 0 00-8-8zM500 0L364 .34a12 12 0 00-12 12v10a12 12 0 0012 12l90-.34.7.71-323.19 323.15a12 12 0 000 17l5.66 5.66a12 12 0 0017 0L477.29 57.34l.71.7-.34 90a12 12 0 0012 12h10a12 12 0 0012-12L512 12a12 12 0 00-12-12z" />
    </svg>
);
