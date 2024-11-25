/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const UserShield = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14 19.5c0-2 1.1-3.8 2.7-4.7-1.3-.5-2.9-.8-4.7-.8-4.4 0-8 1.8-8 4v2h10v-.5m5.5-3.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5M16 8c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4Z" />
    </svg>
);
