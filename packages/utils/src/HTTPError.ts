export class HTTPError extends Error {
    public status: number;
    public statusText: string;
    private response: Response;

    constructor(response: Response) {
        super(`${response.status} ${response.statusText}`);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = HTTPError.name;
        this.status = response.status;
        this.statusText = response.statusText;
        this.response = response;
    }

    public details = async () => {
        try {
            const details = await this.response.json();
            return details;
        } catch (error) {
            return {};
        }
    };
}
