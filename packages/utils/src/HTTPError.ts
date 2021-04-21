export interface HTTPProblemDetails {
    title: string;
    detail: string;
    fields?: Record<string, string>;
}

type ExtractDetails = (response: Response) => Promise<HTTPProblemDetails>;
const defaultExtractDetails: ExtractDetails = async (response) => {
    try {
        const details = await response.json();
        return {
            title: details.title,
            detail: details.detail,
            fields: details.fields,
        };
    } catch (error) {
        return {
            title: 'Error',
            detail: response.statusText,
        };
    }
};

export class HTTPError extends Error {
    public status: number;
    public statusText: string;
    public extractDetails: ExtractDetails;
    private response: Response;
    private detailsPromise?: Promise<HTTPProblemDetails>;

    constructor(
        response: Response,
        extractDetails: ExtractDetails = defaultExtractDetails,
    ) {
        super(`${response.status} ${response.statusText}`);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = HTTPError.name;
        this.status = response.status;
        this.statusText = response.statusText;
        this.response = response;
        this.extractDetails = extractDetails;
    }

    public details = (): Promise<HTTPProblemDetails> => {
        if (!this.detailsPromise) {
            this.detailsPromise = this.extractDetails(this.response);
        }
        return this.detailsPromise;
    };
}
