/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Info = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path
            fill-rule="evenodd"
            d="M11.9 3c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3z"
            clip-rule="evenodd"
        />
        <path d="M14.8 18.3h-1V9.8c0-.8-.7-1.5-1.5-1.5h-1.4c-.8 0-1.5.7-1.5 1.5s.6 1.4 1.4 1.5v7h-1c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5h5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5z" />
    </svg>
);
