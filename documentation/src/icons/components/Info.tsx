/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Info = (h: typeof JSXFactory) => (props: any) => (
    <svg {...props} viewBox="0 0 24 24" aria-hidden="true">
        <path
            fill="none"
            stroke="currentColor"
            d="M12 22c2.7 0 5.2-1 7.1-2.9S22 14.7 22 12s-1-5.2-2.9-7.1S14.7 2 12 2 6.8 3 4.9 4.9 2 9.3 2 12s1 5.2 2.9 7.1S9.3 22 12 22z"
        />
        <path
            fill-rule="evenodd"
            d="M12 5.5c.9 0 1.6.7 1.6 1.6s-.7 1.6-1.6 1.6-1.6-.7-1.6-1.6.7-1.6 1.6-1.6z"
            clip-rule="evenodd"
        />
        <path d="M14 16.3h-.7v-6c0-.6-.5-1-1-1h-1c-.6 0-1 .5-1 1 0 .6.4 1 1 1v4.9h-.8c-.6 0-1 .5-1 1s.5 1 1 1H14c.6 0 1-.5 1-1s-.4-.9-1-.9z" />
    </svg>
);
