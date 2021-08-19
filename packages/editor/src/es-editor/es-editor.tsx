import { Component, h, Element, Prop } from '@stencil/core';
import { editor } from 'monaco-editor';

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
    private editor?: editor.IStandaloneCodeEditor;

    componentDidLoad() {
        this.initializeEditor();
    }

    componentDidUpdate() {
        this.editor?.layout();
    }

    disconnectedCallback() {
        this.editor?.dispose();
    }

    render() {
        return (
            <es-resize-observer
                onSizeChanged={this.resize}
                class={'container'}
                ref={this.captureContainer}
            />
        );
    }

    private containerRef?: HTMLDivElement;
    private captureContainer = (ref?: HTMLDivElement) => {
        this.containerRef = ref;
    };

    private initializeEditor = () => {
        if (!this.containerRef) return;
        this.editor = editor.create(this.containerRef, this.options);
        this.editorRef?.(this.editor);
    };

    private resize = ({
        detail: { width, height },
    }: CustomEvent<DOMRectReadOnly>) => {
        this.editor?.layout({ width, height });
    };
}
