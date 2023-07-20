export interface FileDetails {
    fileName: string;
    content: string;
}

export interface Files {
    [fileName: string]: FileDetails;
}

export interface Settings {
    preview: boolean;
    showLocation: boolean;
    grow: number | false;
    styles?: string;
    usage?: string;
    files: Files;
}
