export interface HTTPProblemDetails {
    /** A human readable short title for the problem. */
    title: string;
    /** A longer form explanation of the problem. */
    detail: string;
    /** If the problem was with a form request, messages are mapped to the data sent. [Working Data](/fields/utils/createWorkingData) will automatically assign these to the originating fields. */
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

const ERROR_KEY = Symbol.for('eventstore/HTTPError');

/** A standardised HTTP request error. Works together with [Working Data](/fields/utils/createWorkingData) to assign HTTPProblemDetails fields to errors on form fields. */
export class HTTPError extends Error {
    static isHTTPError(error: unknown): error is HTTPError {
        return error instanceof Error && ERROR_KEY in error;
    }

    static fromDetails(details: HTTPProblemDetails): HTTPError {
        return new HTTPError(new Response(), async () => details);
    }

    protected [ERROR_KEY] = true;

    /** The status code of the HTTP response. */
    public status: number;
    /** The status name of the HTTP response. */
    public statusText: string;
    /** @internal */
    public extractDetails: ExtractDetails;
    private response: Response;
    private detailsPromise?: Promise<HTTPProblemDetails>;

    /** Construct a HTTPError from a Fetch Response and an an optional details extractor. */
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

    /** Extract the HTTPProblemDetails from the Response. */
    public details = (): Promise<HTTPProblemDetails> => {
        if (!this.detailsPromise) {
            this.detailsPromise = this.extractDetails(this.response);
        }
        return this.detailsPromise;
    };
}
