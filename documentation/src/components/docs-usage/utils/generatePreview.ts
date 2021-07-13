import type { Parts, Files } from './types';

export const generatePreview = (parts: Parts): Files => {
    const usage = `\
    import { Component, h, Fragment } from '@stencil/core';

    ${parts.setup}
    
    @Component({
        shadow: true,
        tag: 'preview-component',
        styleUrl: 'preview-component.css',
    })
    export class PreviewComponent {
        render() {
            return (
                ${parts.render}
            );
        }
    }`;

    return {
        'preview-component.tsx': usage,
        'preview-component.css': parts.css,
    };
};
