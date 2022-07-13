import type { editor } from '@eventstore-ui/editor/monaco';

export interface FileDetails {
    fileName: string;
    title: string;
    hidden: boolean;
    content: string;
}

export interface Settings {
    showLocation: boolean;
    preview: boolean;
    code: boolean;
    grow: number | false;
    parts: Parts;
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
