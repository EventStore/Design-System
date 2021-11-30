import type { Files, Settings } from './types';
import iconDetails from 'icons/icons.json';

export const generatePreview = ({ parts, showLocation }: Settings): Files => {
    const previewComponent = `  
    import { Component, h, Fragment, Prop, State, Host } from '@stencil/core';
    ${showLocation ? "import { router, Route } from '@eventstore/router';" : ''}
    import Usage from 'usage';
    
    @Component({
        shadow: true,
        tag: 'preview-component',
        styleUrl: 'preview-component.css',
    })
    export class PreviewComponent {
        @Prop() prop?: string;
        @State() state: string = '';

        ${
            showLocation
                ? `
        componentWillLoad() {
            router.init();
        }`
                : ''
        }
 
        render() {
            return (
                <Host class={${showLocation ? '"nav"' : 'undefined'}}>
                ${
                    showLocation
                        ? '<preview-usage-location router={router} location={router.location} />'
                        : ''
                }
                    <Usage />
              
                </Host>
            );
        }
    }`;

    const helpers = `
        export const random = (max: number, min: number = 0) => Math.floor(Math.random() * (max - min + 1)) + min;
        export const delay = (time: number) => new Promise<void>((resolve) => setTimeout(resolve, time)); 
        export const nextFrame = () => new Promise<number>(requestAnimationFrame);

        export interface IconDetail {
            name: string;
            component: string;
            path: string;
            aliases?: string[];
        }
        export const iconDetails: Record<string, IconDetail> = ${JSON.stringify(
            iconDetails,
        )};
        export const icons = ${JSON.stringify(Object.keys(iconDetails))};
        export const randomIcon = () => icons[random(icons.length - 1)];
    `;

    const { 'usage.tsx': render, 'style.css': css, ...rest } = parts;

    return Object.values(rest).reduce(
        (acc, { fileName, content }) => ({ ...acc, [fileName]: content }),
        {
            'helpers.ts': helpers,
            'usage.tsx': `
                import { h, Fragment } from '@stencil/core';
                ${render.content}
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
                ${css.content}
            `,
        },
    );
};
