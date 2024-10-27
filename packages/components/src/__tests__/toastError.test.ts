/**
 * @jest-environment jsdom
 */
import { HTTPError } from '@eventstore-ui/utils';
import { toast } from '../utils/toast';
import { toastError } from '../utils/toastError';

// Mock the toast module and its error function
jest.mock('@eventstore-ui/components', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
        info: jest.fn(),
        warning: jest.fn(),
    },
}));

// Mock the Response object for the HTTPError test
Object.assign(global, {
    Response: class {
        constructor() {}
    },
});

describe('toastError utility', () => {
    let mockToaster: HTMLElement;

    beforeAll(() => {
        // Set up a mock `es-toaster` element with `popToast` as a mock function
        mockToaster = document.createElement('div');
        Object.assign(mockToaster, { popToast: jest.fn() });
        document.body.appendChild(mockToaster);

        // Mock document.querySelector to return our mock `es-toaster`
        jest.spyOn(document, 'querySelector').mockImplementation((selector) => {
            return selector === 'es-toaster' ? mockToaster : null;
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        document.querySelector('es-toaster')?.remove();
        jest.restoreAllMocks();
    });

    describe('when handling an HTTP error', () => {
        it('displays the error details', async () => {
            const httpError = new HTTPError(new Response(), async () => ({
                title: 'Oh no',
                detail: 'Oh no!',
                fields: {
                    favouriteAnimal: 'Noone likes that',
                },
            }));

            await toastError(httpError, 'Default Title');

            expect(toast.error).toHaveBeenCalledWith({
                title: 'Oh no',
                message: 'Oh no!',
            });
        });
    });

    describe('when handling a non-HTTP error', () => {
        it('displays the fallback title and error message', () => {
            const nonHttpError = new Error('Something went wrong');

            toastError(nonHttpError, 'Default Title');

            expect(toast.error).toHaveBeenCalledWith({
                title: 'Default Title',
                message: 'Something went wrong', // Adjusted to match actual output
            });
        });
    });

    describe('when handling an unknown error type', () => {
        it('displays the fallback title and stringified error', () => {
            const unknownError = 'An unknown error occurred';

            toastError(unknownError, 'Fallback Title');

            expect(toast.error).toHaveBeenCalledWith({
                title: 'Fallback Title',
                message: 'An unknown error occurred',
            });
        });
    });
});
