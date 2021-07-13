import type { editor } from '@eventstore/editor/monaco';

export interface Parts {
    render: string;
    setup: string;
    css: string;
}

export interface Models {
    render: editor.IModel;
    setup: editor.IModel;
    css: editor.IModel;
}

export interface Files {
    [path: string]: string;
}
