import type { editor } from '@eventstore/editor/monaco';

export interface FileDetails {
    fileName: string;
    title: string;
    hidden: boolean;
    content: string;
}

export interface Parts {
    [fileName: string]: FileDetails;
}

export interface Models {
    [fileName: string]: editor.IModel;
}

export interface Files {
    [path: string]: string;
}
