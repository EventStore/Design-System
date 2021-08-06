import { iconStore } from '@eventstore/components';
import type { Parts, Files } from './types';

export const generatePreview = (parts: Parts): Files => {
    const previewComponent = `\
    import { Component, h, Fragment } from '@stencil/core';
    import Usage from 'usage';
    
    @Component({
        shadow: true,
        tag: 'preview-component',
        styleUrl: 'preview-component.css',
    })
    export class PreviewComponent {
        render() {
            return (
                <Usage />
            );
        }
    }`;

    const helpers = `\
        export const icons = ${JSON.stringify(Object.keys(iconStore['icons']))};
        export const randomIcon = () => icons[Math.floor(Math.random() * icons.length)];
    `;

    return {
        helpers: helpers,
        'usage.tsx': `
        import { h, Fragment } from '@stencil/core';
        ${parts.render}
        `,
        'preview-component.tsx': previewComponent,
        'preview-component.css': `
            :host {
                box-sizing: border-box;
                display: block;
                height: 100vh;
                padding: 20px;
            }
            
            ${parts.css}
        `,
    };
};
