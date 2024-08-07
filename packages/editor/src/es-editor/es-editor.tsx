import { Component, h, Element, Prop } from '@stencil/core';
import type { editor } from '@eventstore-ui/monaco-editor';
import { MONACO } from '../utils/globals';
import { logger } from '../utils/logger';

/**
 * Monaco editor wrapped in a web component. Handles re-layout on container resize
 */
@Component({
    tag: 'es-editor',
    styleUrl: 'es-editor.css',
    shadow: true,
})
export class YEditor {
    @Element() host!: HTMLEsEditorElement;

    /** Editor options. see [monaco docs](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.istandaloneeditorconstructionoptions.html) for details. */
    @Prop() options: editor.IStandaloneEditorConstructionOptions = {};
    /** An optional callback for getting a reference to the editor, for external control.  */
    @Prop() editorRef?: (editor: editor.IStandaloneCodeEditor) => void;
    private editorInstance?: editor.IStandaloneCodeEditor;

    componentDidLoad() {
        this.initializeEditor();
    }

    componentDidUpdate() {
        this.editorInstance?.layout();
    }

    disconnectedCallback() {
        this.editorInstance?.dispose();
    }

    render() {
        return (
            <es-resize-observer onSizeChanged={this.resize} class={'container'}>
                <es-hole-puncher namePrefix={'es-editor'}>
                    <div ref={this.captureContainer} />
                </es-hole-puncher>
            </es-resize-observer>
        );
    }

    private containerRef?: HTMLDivElement;
    private captureContainer = (ref?: HTMLDivElement) => {
        this.containerRef = ref;
    };

    private initializeEditor = () => {
        if (!this.containerRef) return;
        if (window[MONACO] == null) {
            logger.error(
                'Editor has not been initialized. Make sure to call `initialize` from your global script.',
            );
            return;
        }
        this.editorInstance = window[MONACO].editor.create(
            this.containerRef,
            this.options,
        );
        this.editorRef?.(this.editorInstance);
    };

    private resize = ({
        detail: { width, height },
    }: CustomEvent<DOMRectReadOnly>) => {
        this.editorInstance?.layout({ width, height });
    };
}
