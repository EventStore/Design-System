export interface HTTPProblemDetails {
    title: string;
    detail: string;
}

type ExtractDetails = (response: Response) => Promise<HTTPProblemDetails>;
const defaultExtractDetails: ExtractDetails = async (response) => {
    try {
        const details = await response.json();
        return {
            title: details.title,
            detail: details.detail,
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
        return this.extractDetails(this.response);
    };
}
