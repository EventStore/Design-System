/// <Reference path="../icon.d.ts" />
import type { h as JSXFactory } from '@stencil/core';

export const Invite = (h: typeof JSXFactory) => (props: any) => (
    <svg
        {...props}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path d="M22 12v8.41c0 .602-.448 1.09-1 1.09H3c-.552 0-1-.488-1-1.09V12l10 6.5L22 12ZM22 11.892l-5-3.446M2 11.892l5-3.446-5 3.446Z" />
        <path d="M17 2.5H7v12.207a1 1 0 0 0 .455.839l4 2.6a1 1 0 0 0 1.09 0l4-2.6a1 1 0 0 0 .455-.839V2.5ZM10 6.5h2M10 9.5h4" />
    </svg>
);
