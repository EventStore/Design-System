/* eslint-disable no-console */

export const failure = (error: string, hint?: string) => {
    console.error(error);

    if (hint) {
        console.log(hint);
    }

    process.exitCode = 1;
};

export const success = (message: string) => {
    console.log(message);
    process.exitCode = 0;
};

export const info = (message: string) => {
    console.log(message);
};
