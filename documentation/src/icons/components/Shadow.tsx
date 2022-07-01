/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Shadow = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
        viewBox="0 0 24 24"
    >
        <path d="M20.052 12.909c-.449 1.141-4.837 1.504-9.371.29-4.535-1.216-7.39-3.422-7.05-4.69.767-2.862 4.856-7.277 10.704-5.164 5.849 2.113 6.483 6.702 5.716 9.564Z" />
        <path d="M14 3.5s-2 3.25-3.5 8.5S9 21 9 21M14 3.5s-5.103.922-6.5 5M14 3.5s3 3 1.5 7.5" />
        <path d="M5 21.5s4.5-.75 8-.75 6.5.25 6.5.25M14 3.5c.5 0 1.5-.5 1.907-1.29M17 20.5c0-.828-.5-2-2-2s-2 1.172-2 2" />
    </svg>
);
