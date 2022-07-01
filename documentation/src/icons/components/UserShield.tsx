/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const UserShield = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        viewBox="0 0 24 24"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
    >
        <path d="M12 10c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zM13.2 13.1c-.4-.1-.8-.1-1.2-.1-5 0-9 4-9 9M21 22c0-.7-.1-1.4-.3-2.1" />
        <path d="m13.2 13.1 4.5-1.3 4.5 1.3v2.7c0 2.8-1.8 5.3-4.5 6.2-2.7-.9-4.5-3.4-4.5-6.2v-2.7z" />
        <path d="M17.7 11.8 17.7 21.7" />
    </svg>
);
