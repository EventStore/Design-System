import type { Parts, Files } from './types';
import iconDetails from 'icons/icons.json';

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
        export const random = (n) => Math.floor(Math.random() * n);
        export const icons = ${JSON.stringify(Object.keys(iconDetails))};
        export const randomIcon = () => icons[random(icons.length)];
    `;

    return {
        helpers: helpers,
        'usage.tsx': `
        import { h, Fragment } from '@stencil/core';
        ${parts.render}
        `,
        'preview-component.tsx': previewComponent,
        'preview-component.css': `
            * {
                box-sizing: border-box;
            }

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
